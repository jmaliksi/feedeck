import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const MetadataElement = ({data}) => {
  if (data === null) {
    return <></>;
  }

  if (typeof data !== "object") {
    return <>{data}</>;
  }

  if (Array.isArray(data)) {
    return (<ul className="feedMetadataList">
      {data.map((d, i) => (<li key={i}><MetadataElement data={d}/></li>))}
    </ul>);
  }

  return (<ul className="feedMetadataList">
    {Object.entries(data).map(([k, v]) => (<li key={k}>{k}: <MetadataElement data={v}/></li>))}
  </ul>);
};

const FeedMetadata = ({data}) => {
  const [ open, setOpen ] = useState(false);
  const showApple = useSelector((state) => state.showApple);

  return (showApple &&
    <div className="feedMetadata">
      <div className="feedMetadataButton" onClick={() => setOpen(!open)}>[{open ? '-' : '🍎'}]</div>
      {open && <MetadataElement data={data} key="top"/>}
    </div>
  );

};

export default FeedMetadata;
