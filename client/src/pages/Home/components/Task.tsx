import { deleteTask } from "@/api/task/task";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Chip,
} from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  id,
  description,
  due,
  createdAt,
  category,
  priority,
  status,
  onContextMenu,
}: TaskDataProps) {
  const queryClient = useQueryClient();

  // format date based on browser settings
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString("en-GB")} ${date.toLocaleTimeString()}`;
  };

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return (
    <Card
      className="max-w-[400px] rounded-[28px]"
      onContextMenu={onContextMenu}
    >
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-lg">{description}</p>
        </div>
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
          <button
            onClick={() => deleteTaskMutation.mutate(id)}
            className="flex w-5 text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-trash"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              stroke-width="2"
              stroke="#F31260"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 7l16 0" />
              <path d="M10 11l0 6" />
              <path d="M14 11l0 6" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Task;
