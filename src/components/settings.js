import { v4 as uuidv4 } from "uuid";
import { toast } from 'react-toastify';
import { useEffect, useState, useRef } from "react";
import { addColumn, setColumns, setAutoRefresh, setShowCurrentSeason, toggleExpandMetadata, toggleShowApple } from "../redux/actions";
import { useSelector } from "react-redux";
import { refreshFeeds2 } from "../lib/munch";
import { isDarkMode, toggleDarkMode } from "../lib/darkmode";
import ballclark from "../ballclark.png";
import DeckLoader from "./deckloader";

export const AddColumn = () => (
  <div>
  <button className="largeText" onClick={() => addColumn({key: uuidv4()})}>Add Column</button>
  </div>
);

export const ShareLink = ({ hash }) => {
  const [ shareLink, setShareLink ] = useState();
  const toastLink = (link) => {
    navigator.clipboard.writeText(link);
    toast(`Link copied!\n${link}`, {
      autoClose: 4000,
      hideProgressBar: true,
      pauseOnHover: false,
      draggable: false,
    });
  };
  const columns = useSelector((state) => state.columnDefs);

  useEffect(() => {
    setShareLink(undefined);
  }, [columns]);

  return (
    <div className="">
    <button onClick={() => {
      if (shareLink) {
        toastLink(shareLink);
        return;
      }
      fetch('https://tiny.sibr.dev/submit', {
        method: 'POST',
        body: `url=https://feedeck.sibr.dev/#/${hash}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then((r) => {
        if (r.status !== 200) {
          throw new Error("oh no");
        }
        return r.text();
      })
      .then((tinyHash) => {
        const link = `${window.location.origin}/monch#${tinyHash}`;
        setShareLink(link);
        toastLink(link);
      })
      .catch(() => {
        setShareLink(undefined);
        toast("oh no something went wrong", {
          hideProgressBar: true,
          draggable: false
        });
      })
    }}>Share</button>
    {shareLink && <input type="text" value={shareLink} readonly onClick={(e) => e.target.select()}/>}
    </div>
  );
};

export const NewDeck = () => {
  return (
    <div>
    <button onClick={() => window.open(window.location.origin, '_blank')}>New Deck</button>
    </div>
  );
};

export const ResetDeck = () => {
  return (
    <div>
    <button onClick={() => setColumns([{key: uuidv4()}])}>Delete Feed</button>
    </div>
  );
};

export const DuplicateDeck = ({ hash }) => {
  return (
    <div>
    <button onClick={() => window.open(`${window.location.origin}/#/${hash}`, '_blank')}>
    Duplicate Deck
    </button>
    </div>
  );
};

export const RefreshFeed = () => {
  const lastUpdate = useSelector((state) => state.lastUpdate);
  const columns = useSelector((state) => state.columnDefs);
  const feeds = useSelector((state) => state.feeds);
  const autoRefresh = useSelector((state) => state.autoRefresh);
  const [ loading, setLoading ] = useState(false);

  const intervalRef = useRef();
  const refresher = (limit) => {
    setLoading(true);
    refreshFeeds2(columns, feeds, limit, lastUpdate).then(() => {
      setLoading(false);
    })
  };
  useEffect(() => {
    clearTimeout(intervalRef.current);
    if (autoRefresh) {
      intervalRef.current = setTimeout(() => {
        refresher(50);
      }, 20000);
      return () => {
        clearTimeout(intervalRef.current);
      }
    }
  }, [autoRefresh, lastUpdate, columns]);

  return (
    <div>
      <div>
      {loading ? (
        <div className="spinClark">
          <img alt="loading" src={ballclark}/>
        </div>
      ): (
        <button className="largeText" onClick={() => refresher()}>Refresh Feed</button>
      )}
      <div className="defaultText refreshText">Last refresh<br/> {(new Date(lastUpdate)).toLocaleString()}</div>
      </div>
      <div>
        <button onClick={() => {
          if (autoRefresh) {
            setAutoRefresh(false);
          } else {
            setAutoRefresh(true);
          }
        }}>&nbsp;Autorefresh: {autoRefresh ? "Enabled" : "Disabled"}&nbsp;</button>
      </div>
    </div>
  );
};

export const DarkToggle = () => {
  const [ isDark, setIsDark ] = useState(isDarkMode());
  return <button onClick={() => setIsDark(toggleDarkMode())}>&nbsp;{isDark ? "🌞" : "🌚"}&nbsp;</button>;
};

export const Info = () => {
  return (
    <small>
    <a href="https://github.com/jmaliksi/feedeck">github</a>
    </small>
  );
};

export const ShowCurrentSeason = () => {
  const showCurrentSeason = useSelector((state) => state.showCurrentSeason);
  return (<div>
    <button onClick={() => setShowCurrentSeason(!showCurrentSeason)}>&nbsp;Filter current season: {showCurrentSeason ? "Enabled" : "Disabled"}</button>
  </div>);
};

export const ToggleMetadata = () => {
  const showMetadata = useSelector((state) => state.showMetadata);
  return (<div>
    <button onClick={toggleExpandMetadata}>&nbsp;{showMetadata ? "Hide" : "Expand"} Metadata</button>
  </div>);
};

export const ToggleApple = () => {
  const showApple = useSelector((state) => state.showApple);
  return (
    <div>
      <button onClick={toggleShowApple}>&nbsp;{showApple ? "Hide" : "Show"} Apple</button>
    </div>
  );
}

export const SettingsColumn = ({ hash }) => {
  return (
    <div className="card">
      <AddColumn />
      <RefreshFeed />
      <ShowCurrentSeason />
      <ToggleMetadata />
      <ToggleApple />
      <DarkToggle />
      <hr />
      <ShareLink hash={hash} />
      <div>&nbsp;</div>
      <NewDeck />
      <DuplicateDeck hash={hash} />
      <div>&nbsp;</div>
      <DeckLoader />
    </div>
  );
};
