import { ReactElement } from "react";

export interface ContextMenuProps {
  top: number;
  left: number;
  children: ReactElement;
}

function ContextMenu({ top, left, children }: ContextMenuProps) {
  return (
    <div
      style={{
        position: "absolute",
        width: "200px",
        backgroundColor: "#383838",
        borderRadius: "5px",
        boxSizing: "border-box",
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 100,
      }}
    >
      {children}
    </div>
  );
}

export default ContextMenu;
