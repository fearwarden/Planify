import { useEffect, useState } from "react";

export type MouseCoords = {
  x: number;
  y: number;
};

export const useContextMenu = (ref: React.RefObject<HTMLDivElement>) => {
  const [isTaskSelected, setIsTaskSelected] = useState<boolean>(false);
  const [mouseCoords, setMouseCoords] = useState<MouseCoords>({ x: 0, y: 0 });

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const menu = ref.current;
      if (menu && menu.contains(e.target as Node)) {
        return;
      }
      setIsTaskSelected(false);
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  return {
    isTaskSelected,
    setIsTaskSelected,
    mouseCoords,
    setMouseCoords,
  };
};
