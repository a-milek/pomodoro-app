import { useState, useEffect } from "react";
import Ambients from "./Ambients";

const VideoIds = () => {
  const [ids, setIds] = useState<string[]>([]);

  // Load stored IDs from localStorage on component mount
  useEffect(() => {
    const storedIds = localStorage.getItem("youtubeIds");
    if (storedIds) {
      setIds(JSON.parse(storedIds));
    } else {
      // Default IDs if no localStorage is available
      setIds([
        "sjkrrmBnpGE",
        "TIokr8jJPkM",
        "PtIKsk1Qabw",
        "u4ecB57jFhI",
        "tMEWY4ZszUs",
      ]);
    }
  }, []);

  // Function to add a new ID and update localStorage
  const addId = (id: string) => {
    const updatedIds = [...ids, id];
    setIds(updatedIds);
    localStorage.setItem("youtubeIds", JSON.stringify(updatedIds)); // Persist updated IDs
  };

  const deleteId = (idToDelete: string) => {
    const updatedIds = ids.filter((id) => id !== idToDelete);
    setIds(updatedIds);
    localStorage.setItem("youtubeIds", JSON.stringify(updatedIds)); // Persist updated IDs
  };

  return (
    <div>
      <Ambients deleteId={deleteId} ids={ids} addId={addId} />{" "}
    </div>
  );
};

export default VideoIds;
