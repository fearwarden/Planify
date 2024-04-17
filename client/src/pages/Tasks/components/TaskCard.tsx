import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaskResponse, TaskStatus } from "@/types/TaskType";
import { formatDate } from "@/tools/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeTask } from "@/api/task/task";
import { AxiosResponse } from "axios";
import { useState } from "react";

interface TaskCardProps<T> {
  data: T;
}

function TaskCard({ data }: TaskCardProps<TaskResponse>) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [status, setStatus] = useState<string>(data.status);

  const queryClient = useQueryClient();

  const completeTaskMutation = useMutation({
    mutationFn: completeTask,
    onError: (error: AxiosResponse) => {
      setErrorMessage(error.request.response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const handleCompleteTask = () => {
    if (status === TaskStatus.COMPLETE) {
      alert("Task is already completed.");
      return;
    }
    completeTaskMutation.mutate(data.id);
    setStatus("COMPLETE");
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{data.description}</CardTitle>
        <CardDescription>
          Created At: {formatDate(data.createdAt)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-2 mb-4">
          <Badge variant="outline">{data.category}</Badge>
          <Badge variant="outline">{data.priority}</Badge>
          <Badge variant="outline">{status}</Badge>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="due-date">Due Date</Label>
          <Input
            type="text"
            id="due-date"
            placeholder={formatDate(data.due)}
            disabled
          />
        </div>
        {errorMessage && <span>{errorMessage}</span>}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleCompleteTask}
          disabled={status === TaskStatus.COMPLETE}
        >
          {status === TaskStatus.COMPLETE ? "Task Completed" : "Complete Task"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default TaskCard;
