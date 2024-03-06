import { completeTask } from "@/api/task/task";
import { formatDate } from "@/tools/utils";
import { TaskStatus } from "@/types/TaskType";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Chip,
  Checkbox,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useState } from "react";

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
  id,
  onContextMenu,
}: TaskDataProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const queryClient = useQueryClient();

  const completeTaskMutation = useMutation({
    mutationFn: completeTask,
    onError: (error: AxiosResponse) => {
      setErrorMessage(error.request.response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleCompleteTask = () => {
    if (status.toUpperCase() === TaskStatus.COMPLETE) {
      setErrorMessage("Task is already completed.");
      return;
    }
    completeTaskMutation.mutate(id);
  };
  return (
    <Card
      className="max-w-[500px] rounded-[28px]"
      onContextMenu={onContextMenu}
    >
      <CardHeader className="flex gap-3 justify-between">
        <p className="text-lg">{description}</p>
        <Popover placement="right-end" color="foreground">
          <PopoverTrigger>
            <button>
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
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2 items-cente">
              <Button className="text-white" variant="light">
                Edit
              </Button>
              <Button className="text-white" variant="light">
                Delete
              </Button>
              <Button className="text-white" variant="light">
                Complete
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Due date: {formatDate(due)}</p>
        <p>Created at: {formatDate(createdAt)}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex gap-4">
          <Chip color="primary">{category}</Chip>
          <Chip color="danger">{priority}</Chip>
          <Chip color="success">{status}</Chip>
          <Checkbox
            color="success"
            defaultSelected={
              status.toUpperCase() === TaskStatus.COMPLETE ? true : false
            }
            isDisabled={
              status.toUpperCase() === TaskStatus.COMPLETE ? true : false
            }
            lineThrough={
              status.toUpperCase() === TaskStatus.COMPLETE ? true : false
            }
            onClick={handleCompleteTask}
          >
            {status.toUpperCase() === TaskStatus.COMPLETE
              ? "Completed"
              : "Complete Task"}
          </Checkbox>
        </div>
      </CardFooter>
      {errorMessage && <Chip color="danger">{errorMessage}</Chip>}
    </Card>
  );
}

export default Task;
