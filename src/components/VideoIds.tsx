import { useState } from "react";
import Ambients from "./Ambients";

const VideoIds = () => {
  const [ids, setIds] = useState([
    "sjkrrmBnpGE",
    "lGphuanCRDk",
    "HhqWd3Axq9Y",
    "TIokr8jJPkM",
    "PtIKsk1Qabw",
    "u4ecB57jFhI",
    "tMEWY4ZszUs",
  ]);
  const addId = (id: string) => {
    setIds([...ids, id]);
  };

  return (
    <div>
      <Ambients ids={ids} addId={addId} />{" "}
    </div>
  );
};

export default VideoIds;
