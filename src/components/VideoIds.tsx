import { useState, useEffect } from "react";
import Ambients from "./Ambients";

const VideoIds = () => {
  const [ids, setIds] = useState<string[]>([]); //inicjalizacja listy wewnętrznej

  useEffect(() => {
    const storedIds = localStorage.getItem("youtubeIds"); // pobranie istniejących Identyfikatorów
    if (storedIds) {
      setIds(JSON.parse(storedIds)); //dodanie do pamięci wewnętrznej
    } else {
      setIds(["9ou1pl0XNRs", "VwR3LBbL6Jk"]); //ustawienie wartości domyślnych
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
