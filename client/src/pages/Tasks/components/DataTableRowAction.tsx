import {
  DotsHorizontalIcon,
  TrashIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TaskResponse, TaskStatus } from "@/types/TaskType";
import EditTaskModal from "../modals/EditTaskModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeTask, deleteTask } from "@/api/task/task";
import { AxiosResponse } from "axios";
import { useState } from "react";

export interface DataTableRowActionProps<TData> {
  data: TData;
}

function DataTableRowAction({ data }: DataTableRowActionProps<TaskResponse>) {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const queryClient = useQueryClient();

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

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
    if (data.status.toUpperCase() === TaskStatus.COMPLETE) {
      alert("Task is already completed.");
      return;
    }
    completeTaskMutation.mutate(data.id);
  };

  return (
    <Popover>
      <PopoverTrigger asChild className="hover:cursor-pointer">
        <DotsHorizontalIcon />
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <Command>
          <CommandList>
            <CommandGroup heading="Task Actions">
              <CommandItem className="gap-2 hover:cursor-pointer">
                <EditTaskModal taskData={data} />
              </CommandItem>
              <a onClick={() => deleteTaskMutation.mutate(data.id)}>
                <CommandItem className="gap-2 hover:cursor-pointer">
                  <TrashIcon />
                  <span>Delete</span>
                </CommandItem>
              </a>
              <a onClick={handleCompleteTask}>
                <CommandItem className="gap-2 hover:cursor-pointer">
                  <CheckCircledIcon />

                  {data.status.toUpperCase() === TaskStatus.COMPLETE
                    ? "Completed"
                    : "Complete"}
                </CommandItem>
              </a>
            </CommandGroup>
            {errorMessage && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default DataTableRowAction;
