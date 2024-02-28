import { Card, CardBody } from "@nextui-org/react";
import { ReactElement } from "react";

export interface ContextMenuProps {
  top: number;
  left: number;
  children: ReactElement;
  contextMenuRef: React.RefObject<HTMLDivElement>;
}

function ContextMenu({
  top,
  left,
  children,
  contextMenuRef,
}: ContextMenuProps) {
  return (
    <div
      ref={contextMenuRef}
      style={{
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 100,
      }}
    >
      <Card>
        <CardBody>{children}</CardBody>
      </Card>
    </div>
  );
}

export default ContextMenu;
