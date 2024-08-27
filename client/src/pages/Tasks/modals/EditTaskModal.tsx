import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editTask, fetchTaskMetadata } from "@/api/task/task";
import { AxiosResponse } from "axios";
import {combineDateWithT, convertToTimestamp, formatDate} from "@/tools/utils";
import { TaskDataType, TaskResponse } from "@/types/TaskType";
import { TaskSchema } from "@/validation/schemas";
import { Pencil2Icon } from "@radix-ui/react-icons";

interface EditTaskModalProps<T> {
  taskData: T;
}

function EditTaskModal({ taskData }: EditTaskModalProps<TaskResponse>) {
  const [open, setOpen] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(taskData.description);
  const [category, setCategory] = useState<number>(taskData.category.id);
  const [priority, setPriority] = useState<number>(taskData.priority.id);
  const [status, setStatus] = useState<number>(taskData.status.id);
  const [date, setDate] = useState<string>(combineDateWithT(taskData.due).split('T')[0]);
  const [dueTime, setDueTime] = useState<string>(combineDateWithT(taskData.due).split('T')[1]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const queryClient = useQueryClient();
  console.log(taskData.due)

  const { data, isError, isPending, error } = useQuery({
    queryKey: ["task-metadata"],
    queryFn: fetchTaskMetadata,
    enabled: open,
  });

  const editTaskMutation = useMutation({
    mutationFn: editTask,
    onError: (error: AxiosResponse) => {
      setErrorMessage(error.request.response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setOpen(!open);
    },
  });

  const handleTaskEdit = () => {
    if (!data) return;
    let editedDue = convertToTimestamp(date, dueTime);
    if (editedDue.length < 2) {
      editedDue = taskData.due;
    }
    const payload: TaskDataType = {
      description: description,
      due: editedDue,
      categoryId:
        category ??
        data.categories.filter((cat) => cat.name === category)[0].id,
      priorityId:
        priority ??
        data.priorities.filter((p) => p.level === priority)[0].id,
      statusId:
        status ?? data.status.filter((s) => s.progress === status)[0].id,
    };
    const validation = TaskSchema.safeParse(payload);
    if (!validation.success) {
      setErrorMessage(
        JSON.parse(
          validation.error.message
            .slice(validation.error.message.search("message"))
            .split(":")[1]
            .split(",")[0]
        )
      );
      return;
    }
    editTaskMutation.mutate({ data: validation.data, id: taskData.id });
  };

  if (open && isPending) return <span>Loading...</span>;
  if (open && isError) return <span>Error: {error.message}</span>;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="w-full">
        <a className="flex gap-2 items-center">
          <Pencil2Icon />
          <span>Edit</span>
        </a>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Created at: {formatDate(taskData.createdAt)}
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder={description}
              className="items-start"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="categories">Category</Label>
            <Select onValueChange={(value) => setCategory(parseInt(value))}>
              <SelectTrigger className="items-start" id="categories">
                <SelectValue placeholder={taskData.category.name} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {data?.categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="priorities">Priority</Label>
            <Select onValueChange={(value) => setPriority(parseInt(value))}>
              <SelectTrigger className="items-start" id="priorities">
                <SelectValue placeholder={taskData.priority.level} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Priorities</SelectLabel>
                  {data?.priorities.map((priority) => (
                    <SelectItem
                      key={priority.id}
                      value={priority.id.toString()}
                    >
                      {priority.level}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={(value) => setStatus(parseInt(value))}>
              <SelectTrigger className="items-start" id="status">
                <SelectValue placeholder={taskData.status.progress} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  {data?.status.map((s) => (
                    <SelectItem key={s.id} value={s.id.toString()}>
                      {s.progress}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="due-date">
              Due Date: {formatDate(taskData.due)}
            </Label>
            <Input type="date" onChange={(e) => setDate(e.target.value)} />
            <Input type="time" onChange={(e) => setDueTime(e.target.value)} />
          </div>
        </div>
        {errorMessage && <span color="danger">{errorMessage}</span>}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={handleTaskEdit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditTaskModal;
