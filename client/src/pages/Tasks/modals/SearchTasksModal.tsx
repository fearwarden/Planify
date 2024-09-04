import { fetchSearchedTasks } from "@/api/task/task";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";

function SearchTasksModal() {
  const [searchParam, setSearchParam] = useState<string>("");

  const { data, refetch } = useQuery({
    queryKey: ["tasks", searchParam],
    queryFn: () => fetchSearchedTasks(searchParam),
    enabled: false,
  });

  useEffect(() => {
    if (searchParam.length < 1) return;
    refetch();
  }, [searchParam, refetch]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-8 w-[150px] lg:w-[250px] flex justify-start gap-1"
        >
          <MagnifyingGlassIcon />
          <span className="text-gray-400">Search tasks...</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search Tasks</DialogTitle>
          <DialogDescription>Fastest way to find your task</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="name"
              placeholder="search..."
              className="col-span-4"
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
            />
          </div>
          <ScrollArea className="h-[500px] w-full rounded-md border">
            {data && data.length > 0 ? (
              data.map((task) => (
                <div
                  className="flex items-center justify-center p-2"
                  key={`${task.id}-div`}
                >
                  <TaskCard data={task} key={task.id} />
                </div>
              ))
            ) : (
              <div className="flex justify-center">
                <span>No recent searches</span>
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SearchTasksModal;
