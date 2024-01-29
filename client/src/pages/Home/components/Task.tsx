import { deleteTask } from "@/api/task/task";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Chip,
  Button,
} from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface TaskDataProps {
  id: string;
  description: string;
  due: Date;
  createdAt: Date;
  category: string;
  priority: string;
  status: string;
}

function Task({
  id,
  description,
  due,
  createdAt,
  category,
  priority,
  status,
}: TaskDataProps) {
  const queryClient = useQueryClient();

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return (
    <Card className="max-w-[400px] rounded-[28px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-lg">{description}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Due date: {due.toString()}</p>
        <p>Created at: {createdAt.toString()}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex items-end gap-4">
          <Chip color="primary">{category}</Chip>
          <Chip color="danger">{priority}</Chip>
          <Chip color="success">{status}</Chip>
          <Button
            color="danger"
            size="sm"
            onClick={() => {
              deleteTaskMutation.mutate(id);
            }}
          >
            Delete Task
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Task;
