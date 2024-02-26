import { useEffect, useState } from "react";

export type MouseCoords = {
  x: number;
  y: number;
};

export const useContextMenu = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [mouseCoords, setMouseCoords] = useState<MouseCoords>({ x: 0, y: 0 });

  useEffect(() => {
    const handleClick = () => setClicked(false);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  return {
    clicked,
    setClicked,
    mouseCoords,
    setMouseCoords,
  };
};
