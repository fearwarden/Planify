import { formatDate } from "@/tools/utils";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Chip,
} from "@nextui-org/react";

interface TaskDataProps {
  id: string;
  description: string;
  due: string;
  createdAt: string;
  category: string;
  priority: string;
  status: string;
  onContextMenu: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function Task({
  description,
  due,
  createdAt,
  category,
  priority,
  status,
  onContextMenu,
}: TaskDataProps) {
  return (
    <Card
      className="max-w-[400px] rounded-[28px]"
      onContextMenu={onContextMenu}
    >
      <CardHeader className="flex gap-3 justify-between">
        <p className="text-lg">{description}</p>
        <button className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
        </button>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Due date: {formatDate(due)}</p>
        <p>Created at: {formatDate(createdAt)}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex items-end gap-4">
          <Chip color="primary">{category}</Chip>
          <Chip color="danger">{priority}</Chip>
          <Chip color="success">{status}</Chip>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Task;
