import { useState } from "react";
import Ambients from "./Ambients";

const VideoIds = () => {
  const [ids, setIds] = useState([
    "sjkrrmBnpGE",
    "lGphuanCRDk",
    "HhqWd3Axq9Y",
    "1wOAhRAqb40",
    "PtIKsk1Qabw",
    "u4ecB57jFhI",
    "tMEWY4ZszUs",
  ]);
  const addId = (id: string) => {
    setIds([...ids, id]); // Update the array by adding a new item
  };
  // Shared array state
  return (
    <div>
      <Ambients ids={ids} addId={addId} />{" "}
    </div>
  );
};

export default VideoIds;
