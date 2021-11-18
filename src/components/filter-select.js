import Select from "react-select";
import { updateColumn, removeColumn, moveColumn } from "../redux/actions";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { knownTypes } from "../api/eventuallie";
import ReactModal from 'react-modal';
import { blaseballPhases } from "../api/blaseball";

const AdvancedTypeModal = (props) => {
  const { defs, close } = props;
  const [ types, setTypes ] = useState(new Set(defs?.eventTypes || []));
  const [ search, setSearch ] = useState(undefined);

  return (
    <>
    <h2 style={{margin: 0}}>Blaseball Phases</h2>
    <div className="typeModalColumns">
      {
        blaseballPhases.map((p) => {
          return (
            <div key={p.value} className="typeCheckbox">
              <input
                id={`phase${p.value}`}
                type="checkbox"
                checked={types.has(p.value)}
                onChange={() => {
                  if (types.has(p.value)) {
                    types.delete(p.value);
                  } else {
                    types.add(p.value);
                  }
                  setTypes(new Set(types));
                }}
              />
              <label htmlFor={`phase${p.value}`}>{`${-p.value}: ${p.desc}`}</label>
            </div>
          );
        })
      }
    </div>
    <div>&nbsp;</div>
    <h2 style={{margin: 0}}>Blaseball Events</h2>
    <input
      type="text"
      placeholder="Filter"
      onChange={(e => {
        setSearch(e.target.value);
      })}/>
    <div className="typeModalColumns">
      {knownTypes
        .filter((t) => {
          return !search || t.desc.toLowerCase().includes(search.toLowerCase()) || `${t.value}`.includes(`${search}`);
        })
        .map((t) => {
        return (
          <div key={t.value} className="typeCheckbox">
          <input
            id={`type${t.value}`}
            type="checkbox"
            checked={types.has(t.value)}
            onChange={() => {
              if (types.has(t.value)) {
                types.delete(t.value);
              } else {
                types.add(t.value);
              }
              setTypes(new Set(types));
            }}
          />
          <label htmlFor={`type${t.value}`}>{`${t.value}: ${t.desc}`}</label>
          </div>
        );
      })}
    </div>
    <button onClick={() => close(types)}>{"Save & Close"}</button>
    <button onClick={() => setTypes(new Set())}>Clear</button>
    </>
  );
};

const TypeSelect = (props) => {
  const { colId, defs } = props;
  const [ expandAdvanced, setExpandAdvanced ] = useState(false);
  const closeAdvanced = (types) => {
    setExpandAdvanced(false);
    updateColumn(colId, {
      eventTypes: [...types]
    });
  };

  const [ category, setCategory ] = useState(new Set(defs?.categories || []));
  useEffect(() => {
    updateColumn(colId, {
      categories: [...category]
    });
  }, [category, colId]);

  const categoryOptions = [
    {label: "Plays", value: 0},
    {label: "Changes", value: 1},
    {label: "Special", value: 2},
    {label: "Outcomes", value: 3},
    {label: "Narrative", value: 4}
  ];

  return (
    <div>
      <div className="categorySelect">
        <div className="categoryOption">
          <input
            id={`cat_all${colId}`}
            type="checkbox"
            checked={category.size === 0}
            onChange={() => {
              if (category.size !== 0) {
                setCategory(new Set());
              }
            }}
          />
          <label htmlFor={`cat_all${colId}`}>All</label>
        </div>
        {categoryOptions.map((o) => {
          return (
            <div key={`${colId}${o.value}`} className="categoryOption">
              <input
                id={`cat${o.value}${colId}`}
                type="checkbox"
                checked={category.has(o.value)}
                onChange={() => {
                  if (category.has(o.value)) {
                    category.delete(o.value);
                  } else {
                    category.add(o.value);
                  }
                  if (category.size === categoryOptions.length) {
                    category.clear();
                  }
                  setCategory(new Set(category));
                }}
              />
              <label htmlFor={`cat${o.value}${colId}`}>{o.label}</label>
            </div>
          );
        })}
      </div>
      <button onClick={() => setExpandAdvanced(!expandAdvanced)}>{"Advanced >>"}</button>
      <ReactModal isOpen={expandAdvanced} className="typeModal">
        <AdvancedTypeModal defs={defs} close={closeAdvanced} />
      </ReactModal>
      {defs?.eventTypes && <div className="selectedTypes">
        {blaseballPhases.filter((t) => defs.eventTypes.includes(t.value)).map((p) => {
          return (<div key={p.value} className="selectedTypeCrumb">{p.desc}</div>);
        })}
        {knownTypes.filter((t) => defs.eventTypes.includes(t.value)).map((t) => {
          return (<div key={t.value} className="selectedTypeCrumb">{t.value}: {t.desc}</div>);
        })}
      </div>}
    </div>
  );
};

const FilterSelect = (props) => {
  const teamOptions = useSelector((state) => state.teamOptions);
  const playerOptions = useSelector((state) => state.playerOptions);
  const defs = useSelector((state) => state.columnDefs.find((c) => {
    return c.key === props.id;
  }));

  const [expand, setExpand] = useState(props.expand || defs?.title === undefined ? true : false);
  const [removeConfirm, setRemoveConfirm] = useState(false)

  const beingOptions = [
    {label: "Big Deal", value: -1},
    {label: "Monitor", value: 1},
    {label: "Coin", value: 2},
    {label: "Reader", value: 3},
    {label: "Microphone", value: 4},
    {label: "Lōotcrates", value: 5},
    {label: "Namerifeht", value: 6},
  ];

  const checkTitle = (opt) => {
    if (!opt || defs?.title) {
      return undefined;
    }
    return opt[0].label;
  };

  const selectStyle = {
    option: (styles, state) => ({
      ...styles,
      cursor: "pointer",
    }),
    control: (styles) => ({
      ...styles,
      cursor: "pointer",
    }),
  };

  let selectedTeams = [];
  if (defs && defs.teamIds) {
    teamOptions.forEach((option) => {
      option.options.forEach((t) => {
        if (defs.teamIds.includes(t.value)) {
          selectedTeams.push(t);
        }
      });
    });
  }

  return (
    <div>
    {!expand ? (
      <button onClick={() => setExpand(true)} className="editButton">edit</button>
    ) : (
      <button className="floatRight editButtons" onClick={() => setExpand(false)}>ok</button>
    )}
    {expand ?
      <input
        type="text"
        placeholder={defs?.title || "Title"}
        onBlur={(e) => e.target.value !== defs?.title && updateColumn(props.id, {title: e.target.value})}
        className="titleEdit"
      /> :
      <h1>{defs?.title || "New Column"}</h1>
    }
    {expand && (
      <div className="editPanel">
        <TypeSelect colId={props.id} defs={defs} />

        <label>Teams</label>
        <Select
          classNamePrefix="editDropdown"
          styles={selectStyle}
          options={teamOptions}
          defaultValue={selectedTeams}
          isMulti
          onChange={(opt) => {
            updateColumn(props.id, {
              title: checkTitle(opt),
              teamIds: opt.map((o) => o.value)
            })
          }} 
        />

        <label>Players</label>
        <Select
          classNamePrefix="editDropdown"
          styles={selectStyle}
          options={playerOptions}
          defaultValue={defs && playerOptions.filter((p) => defs.playerIds?.includes(p.value))}
          isMulti
          onChange={(opt) => {
            updateColumn(props.id, {
              title: checkTitle(opt),
              playerIds: opt.map((o) => o.value)
            })
          }}
        />

        <label>Beings</label>
        <Select
          classNamePrefix="editDropdown"
          styles={selectStyle}
          options={beingOptions}
          defaultValue={defs && beingOptions.filter((b) => defs.beings?.includes(b.value))}
          isMulti
          onChange={(opt) => {
            updateColumn(props.id, {
              title: checkTitle(opt),
              beings: opt.map((o) => o.value)
            });
          }}
        />
        <button onClick={() => moveColumn(props.id, -1)}>Move Left</button>
        <button onClick={() => moveColumn(props.id, 1)}>Move Right</button>
        {removeConfirm ? (
          <>
          <button onClick={() => setRemoveConfirm(false)} className="">no</button>
          <button onClick={() => removeColumn(props.id)} className="floatRight">yes</button>
          <label className="">{"Remove column?"}</label>
          </>
        ) : (
          <button onClick={() => setRemoveConfirm(true)} className="">Delete Column</button>
        )}
      </div>
    )}

    </div>
  );
};

export default FilterSelect;
