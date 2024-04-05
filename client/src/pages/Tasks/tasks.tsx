import DataTable from "./components/DataTable";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/api/task/task";
import { useState } from "react";

function Tasks() {
  const [page, setPage] = useState<number>(1);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["tasks", page],
    queryFn: () => fetchTasks(page),
    placeholderData: keepPreviousData, // displaying previous data while fetching new data
  });
  if (isPending) return <span>Loading...</span>;
  if (isError) return <span>Error: {error.message}</span>;
  return (
    <>
      <div className="md:hidden"></div>
      <div className="hidden h-screen flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your most recent tasks!
            </p>
          </div>
          <div className="flex items-center space-x-2"></div>
        </div>
        <DataTable data={data} page={page} />
      </div>
    </>
  );
}

export default Tasks;
