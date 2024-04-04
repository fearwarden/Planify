import path from "path";

import { columns } from "./components/columns";
import DataTable from "./components/data-table";
import { keepPreviousData, useQueries } from "@tanstack/react-query";
import { fetchTasks } from "@/api/task/task";
import { useState } from "react";
import { TaskDataType } from "@/types/TaskType";

function Tasks() {
  const [page, setPage] = useState<number>(1);
  const [taskQuery] = useQueries({
    queries: [
      {
        queryKey: ["tasks", page],
        queryFn: () => fetchTasks(page),
        placeholderData: keepPreviousData, // displaying previous data while fetching new data
      },
    ],
  });
  if (taskQuery.isPending) return <span>Loading...</span>;
  if (taskQuery.isError) return <span>Error: {taskQuery.error.message}</span>;
  return (
    <>
      <div className="md:hidden"></div>
      <div className="hidden h-screen flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2"></div>
        </div>
        <DataTable data={taskQuery.data?.content} columns={columns} />
      </div>
    </>
  );
}

export default Tasks;
