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
import { createTask, fetchTaskMetadata } from "@/api/task/task";
import { AxiosResponse } from "axios";
import { convertToTimestamp } from "@/tools/utils";
import { TaskDataType } from "@/types/TaskType";
import { TaskSchema } from "@/validation/schemas";

function CreateTask() {
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<number>(0);
  const [priority, setPriority] = useState<number>(0);
  const [status, setStatus] = useState<number>(0);
  const [dueTime, setDueTime] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const queryClient = useQueryClient();

  const { data, isError, isPending, error } = useQuery({
    queryKey: ["task-metadata"],
    queryFn: fetchTaskMetadata,
    enabled: open,
  });

  const taskMutation = useMutation({
    mutationFn: createTask,
    onError: (error: AxiosResponse) => {
      setErrorMessage(error.request.response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setOpen(!open);
    },
  });

  const handleCreateTask = () => {
    const due = convertToTimestamp(date, dueTime);
    const taskData: TaskDataType = {
      description,
      categoryId: category,
      priorityId: priority,
      statusId: status,
      due,
    };
    const validation = TaskSchema.safeParse(taskData);
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
    taskMutation.mutate(validation.data);
  };

  if (open && isPending) return <span>Loading...</span>;
  if (open && isError) return <span>Error: {error.message}</span>;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            Creating or adding new tasks couldn't be easier.
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Description"
              className="items-start"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="categories">Category</Label>
            <Select onValueChange={(value) => setCategory(parseInt(value))}>
              <SelectTrigger className="items-start" id="categories">
                <SelectValue placeholder="Select a category" />
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
                <SelectValue placeholder="Select a priority" />
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
                <SelectValue placeholder="Select a status" />
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
            <Label htmlFor="due-date">Due Date</Label>
            {/* <Popover>
              <PopoverTrigger asChild id="due-date">
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover> */}
            <Input type="date" onChange={(e) => setDate(e.target.value)} />
            <Input type="time" onChange={(e) => setDueTime(e.target.value)} />
          </div>
          {errorMessage && <p className="text-white">{errorMessage}</p>}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
          <Button onClick={handleCreateTask}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTask;
