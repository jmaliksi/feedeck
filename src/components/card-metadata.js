import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getMod, getTeam } from "../api/blaseball";
import { fetchFeed } from "../api/eventuallie";
import emoji from "../lib/emoji";
import LoadingClark from "./loading-clark";

const Minus = () => <span style={{color: "#F00"}}>-</span>;
const Plus = () => <span style={{color: "#0C0"}}>+</span>;
const Star = ({color}) => <svg stroke={color} fill={color} stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9.362 9.158l-5.268.584c-.19.023-.358.15-.421.343s0 .394.14.521c1.566 1.429 3.919 3.569 3.919 3.569-.002 0-.646 3.113-1.074 5.19-.036.188.032.387.196.506.163.119.373.121.538.028 1.844-1.048 4.606-2.624 4.606-2.624l4.604 2.625c.168.092.378.09.541-.029.164-.119.232-.318.195-.505l-1.071-5.191 3.919-3.566c.14-.131.202-.332.14-.524s-.23-.319-.42-.341c-2.108-.236-5.269-.586-5.269-.586l-2.183-4.83c-.082-.173-.254-.294-.456-.294s-.375.122-.453.294l-2.183 4.83z"></path></svg>;
const Arrow = () => <svg fill="#888" stroke-width="0" viewBox="0 0 14 12" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z" clip-rule="evenodd"></path></svg>;

const getPosition = (p) => ["🏏 Lineup", "⚾️ Rotation", "🕶 Shadows", "🕶 Shadow"][p];

const roundNum = (n) => Math.round(n * 100) / 100.0;

const getTeamEmoji = (id) => {
  return getTeam(id).then(team => emoji(team.emoji));
}

const StarNumber = ({n, color}) => {
  return <span style={{color: color}} >{roundNum(n)}<Star color={color}/></span>;
};

const AddedMod = ({ sign, metadata }) => {
  const [ color, setColor ] = useState('#fff');
  const [ text, setText ] = useState('');
  useEffect(() => getMod(metadata.mod).then(m => {
    setColor(m[0].textColor);
    setText(m[0].title);
  }), [metadata.mod]);

  return <div>{sign} <span style={{color: color}}>{text}</span></div>;
};

const TimedModExpiry = ({ metadata }) => {
  const [ mods, setMods ] = useState([]);
  useEffect(() => {
    getMod(metadata.mods).then(m => setMods(m));
  }, [metadata.mods]);

  return (<ul className="plainlist">
    {mods.map(m => (<li key={m.id} style={{color: m.textColor}}><Minus/> {m.title}</li>))}
  </ul>);
};

const ReplaceMod = ({ metadata }) => {
  const [ from, setFrom ] = useState([]);
  const [ to, setTo ] = useState([]);
  useEffect(() => {
    getMod([metadata.from, metadata.to]).then(m => {
      setFrom(m[0]);
      setTo(m[1]);
    });
  }, [metadata.from, metadata.to])
  return (<div>
    <span style={{color: from.textColor}}>{from.title}</span>
    &nbsp;<Arrow/>&nbsp;
    <span style={{color: to.textColor}}>{to.title}</span>
  </div>);
};

const MultiMod = ({ metadata }) => {
  const [ adds, setAdds ] = useState([]);
  const [ removes, setRemoves ] = useState([]);
  useEffect(() => {
    const r = metadata.removes?.map(m => m.mod);
    const a = metadata.adds?.map(m => m.mod);
    getMod(r).then(res => setRemoves(res));
    getMod(a).then(res => setAdds(res));
  }, [metadata.adds, metadata.removes])
  return (<div>
    <ul className="plainlist">
      {removes.map(m => (<li style={{color: m.textColor}}><Minus/> {m.title}</li>))}
    </ul>
    <ul className="plainlist">
      {adds.map(m => (<li style={{color: m.textColor}}><Plus/> {m.title}</li>))}
    </ul>
  </div>);
};

const TeamEmoji = ({teamId}) => {
  const [ em, setEm ] = useState();
  useEffect(() => getTeamEmoji(teamId).then(e => setEm(e)), [teamId]);
  return <span className="metadataEmoji">{em}</span>;
};

const AddPlayer = ({ metadata, sign }) => {
  const pos = getPosition(metadata.location);
  return <div className="grid-2">
    <div><TeamEmoji teamId={metadata.teamId}/>{metadata.teamName}</div>
    <div>
      <div>{sign} {metadata.playerName}</div>
      {pos && <div>{pos}</div>}
    </div>
  </div>
};

const ShadowSwapNecro = ({ metadata }) => {
  const addPos = getPosition(metadata.addLocation);
  const remPos = getPosition(metadata.retreatLocation);

  return (
    <div className="grid-2">
      <div><Minus/> {metadata.retreatPlayerName}</div>
      <div>{remPos}</div>

      <div><Plus/> {metadata.addPlayerName}</div>
      <div>{addPos}</div>
    </div>
  )
};

const ShadowSwapReturn = ({ metadata }) => {
  const addPos = getPosition(metadata.promoteLocation);
  const remPos = getPosition(metadata.removeLocation);

  return (
    <div className="grid-2">
      <div><Minus/> {metadata.removePlayerName}</div>
      <div>{remPos}</div>

      <div><Plus/> {metadata.promotePlayerName}</div>
      <div>{addPos}</div>
    </div>
  )
};

const TradePlayer = ({ metadata }) => {
  return (
    <div className="grid-2">
      <div><TeamEmoji teamId={metadata.aTeamId}/> {metadata.aTeamName}</div>
      <div><Plus/>{metadata.bPlayerName}</div>

      <div><TeamEmoji teamId={metadata.bTeamId}/> {metadata.bTeamName}</div>
      <div><Plus/>{metadata.aPlayerName}</div>
    </div>
  );
};

const PositionSwap = ({metadata}) => {
  return (
    <div className="grid-2">
      <div>{metadata.aPlayerName}</div>
      <div><Arrow/> {getPosition(metadata.bLocation)}</div>
      <div>{metadata.bPlayerName}</div>
      <div><Arrow/> {getPosition(metadata.aLocation)}</div>
    </div>
  );
};

const SendPlayer = ({metadata}) => {
  return (
    <div className="grid-2">
      <div><TeamEmoji teamId={metadata.sendTeamId}/>{metadata.sendTeamName}</div>
      <div><Minus/> {metadata.playerName}</div>
      <div><TeamEmoji teamId={metadata.receiveTeamId}/>{metadata.receiveTeamName}</div>
      <div><Plus/> {metadata.playerName}</div>
    </div>
  );
};

const IncineratePlayer = ({metadata}) => {
  const { teamId, teamName, outPlayerName, inPlayerName } = metadata
  if (!teamId || !teamName || !outPlayerName || !inPlayerName) {
    return <></>;
  }
  return (
    <div className="grid-2">
      <div><TeamEmoji teamId={teamId}/>{teamName}</div>
      <div><Minus/> {outPlayerName}</div>
      <div><TeamEmoji teamId={teamId}/>{teamName}</div>
      <div><Plus/> {inPlayerName}</div>
    </div>
  );
};

const IncreaseRating = ({metadata, color}) => {
  const mult = 5;
  const label = ["Hitting", "Pitching", "Defense", "Baserunning", "Combined", "Overall"][metadata.type];
  return <div className="grid-2">
    <div>{label}</div>
    <div>{roundNum(mult * metadata.before)} <Arrow/> <StarNumber n={mult * metadata.after} color={color}/></div>
  </div>
};

const IncreaseAttr = ({metadata, color}) => {
  const label = [
    'Tragicness',
    'Buoyancy',
    'Thwackability',
    'Moxie',
    'Divinity',
    'Musclitude',
    'Patheticism',
    'Martyrdom',
    'Cinnamon',
    'BaseThirst',
    'Laserlikeness',
    'Continuation',
    'Indulgence',
    'GroundFriction',
    'Shakespearianism',
    'Suppression',
    'Unthwackability',
    'Coldness',
    'Overpowerment',
    'Ruthlessness',
    'Pressurization',
    'Omniscience',
    'Tenaciousness',
    'Watchfulness',
    'Anticapitalism',
    'Chasiness'
  ][metadata.type];
  return <div className="grid-2">
    <div>{label}</div>
    <div>{roundNum(metadata.before)} <Arrow/> <StarNumber n={metadata.after} color={color}/></div>
  </div>
};

const Score = ({metadata}) => {
  return (
    <div className="grid-2">
      <div>{emoji(metadata.awayEmoji)} {metadata.awayScore}</div>
      <div>{emoji(metadata.homeEmoji)} {metadata.homeScore}</div>
    </div>);
};

const WillResult = ({metadata, teamTags}) => {
  const { totalVotes, dataVotes, willVotes, children } = metadata;

  const [ kids, setKids ] = useState(<LoadingClark />);
  useEffect(() => {
    if (!children || children.length === 0) {
      setKids(<></>);
      return;
    }
    fetchFeed({ids: children}).then((childs) => {
      setKids(
        childs.map((child) => (
          <div className="metadataChild" key={child.id}>
            <div>{child.description}</div>
            <EntryMetadata data={child} />
          </div>
        ))
      );
    });
  }, [children]);

  return (<div>
    <div>{kids}</div>
    <div className="grid-3 metadataVotes">
      <div>Total Votes</div>
      <div>{totalVotes.toLocaleString()}</div>
      <div>&nbsp;</div>

      <div>This Will</div>
      <div>{willVotes.toLocaleString()}</div>
      <div>{(willVotes / totalVotes * 100).toFixed(1)}%</div>

      <div>This Filing</div>
      <div>{dataVotes.toLocaleString()}</div>
      <div>{((dataVotes / willVotes) * (willVotes / totalVotes) * 100).toFixed(1)}%</div>
    </div>
  </div>);
};

const BlessingResult = ({metadata}) => {
  const { votes, totalVotes, highestVotes, teamName, highestTeam, children } = metadata;
  const [ highestBidder, setHighestBidder ] = useState(<LoadingClark/>);
  useEffect(() => getTeam(highestTeam).then(t => setHighestBidder(t.nickname)), [highestTeam]);

  const [ kids, setKids ] = useState(<LoadingClark />);
  useEffect(() => {
    if (!children || children.length === 0) {
      setKids(<></>);
      return;
    }
    fetchFeed({ids: children}).then((childs) => {
      setKids(
        childs.map((child) => (
          <div className="metadataChild" key={child.id}>
            <div>{child.description}</div>
            <EntryMetadata data={child} />
          </div>
        ))
      );
    });
  }, [children]);

  return (<div>
    <div>{kids}</div>
    {votes && totalVotes && highestVotes && (
      <div className="grid-3 metadataVotes">
        <div>Total Votes</div>
        <div>{totalVotes.toLocaleString()}</div>
        <div>&nbsp;</div>

        <div>{teamName}</div>
        <div>{votes.toLocaleString()}</div>
        <div>{(votes / totalVotes * 100).toFixed(1)}%</div>

        <div>{highestBidder}</div>
        <div>{highestVotes.toLocaleString()}</div>
        <div>{((highestVotes / totalVotes) * 100).toFixed(1)}%</div>
      </div>
    )}
  </div>);
};

const DecreeResult = ({metadata}) => {
  const { totalVotes, votes } = metadata;
  return (<div>
    <div className="grid-3">
      <div>Total Votes</div>
      <div>{totalVotes.toLocaleString()}</div>
      <div>&nbsp;</div>

      <div>This Decree</div>
      <div>{votes.toLocaleString()}</div>
      <div>{(votes / totalVotes * 100).toFixed(1)}%</div>

    </div>
  </div>);
};

const EntryMetadata = (props) => {
  const { type, metadata } = props.data;

  if (!metadata) {
    return <></>;
  }

  switch (type) {
    case 59:
      return <DecreeResult metadata={metadata}/>
    case 60:
      return <BlessingResult metadata={metadata} />
    case 61:
      return <WillResult metadata={metadata} teamTags={props.data.teamTags} />
    case 106:
    case 146:
    case 203:
    case 210:
      return <AddedMod metadata={metadata} sign={<Plus/>} />
    case 107:
    case 147:
    case 211:
      return <AddedMod metadata={metadata} sign={<Minus/>} />
    case 108:
      return <TimedModExpiry metadata={metadata} />
    case 148:
      return <ReplaceMod metadata={metadata} />
    case 171:
    case 172:
      return <MultiMod metadata={metadata} />
    case 109:
      return <AddPlayer metadata={metadata} sign={<Plus />} />
    case 112:
      return <AddPlayer metadata={metadata} sign={<Minus />} />
    case 110:
      return <ShadowSwapNecro metadata={metadata} />
    case 111:
      return <ShadowSwapReturn metadata={metadata} />
    case 113:
      return <TradePlayer metadata={metadata} />
    case 114:
      return <PositionSwap metadata={metadata} />
    case 115:
      return <SendPlayer metadata={metadata} />
    case 116:
      return <IncineratePlayer metadata={metadata} />
    case 117:
      return <IncreaseRating metadata={metadata} color="#0C0" />
    case 118:
    case 122:
      return <IncreaseRating metadata={metadata} color="#F00" />
    case 179:
      return <IncreaseAttr metadata={metadata} color="#0C0" />
    case 180:
      return <IncreaseAttr metadata={metadata} color="#F00" />
    case 119:
      return <IncreaseRating metadata={metadata} color={metadata.after > metadata.before ? "#0C0" : "#F00"} />
    case 144:
      return <ReplaceMod metadata={metadata}/>
    case 209:
      return <Score metadata={metadata}/>
    default:
      return <></>;
  };
};

const EntryMetadataContainer = ({data}) => {
  const showMetadata = useSelector((state) => state.showMetadata);
  return showMetadata && (<div className="metadataCard"><small><EntryMetadata data={data} /></small></div>);
};

export default EntryMetadataContainer;
