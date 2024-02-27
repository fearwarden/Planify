import { Card, CardBody } from "@nextui-org/react";
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
