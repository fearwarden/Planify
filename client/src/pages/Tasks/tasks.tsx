import DataTable from "./components/DataTable";
import { keepPreviousData, useQueries } from "@tanstack/react-query";
import { fetchTasks, fetchTasksFiltered } from "@/api/task/task";
import {useState} from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useAuthRedirect from "@/hooks/useAuthRedirect.ts";
import {LoadingSpinner} from "@/components/ui/loading-spinner.tsx";

function Tasks() {
  const [page, setPage] = useState<number>(1);
  const [filterPage, setFilterPage] = useState<number>(1);
  const filter = useSelector((state: RootState) => state.filters);
  const isChecking = useAuthRedirect();

  const [taskQuery, filterTaskQuery] = useQueries({
    queries: [
      {
        queryKey: ["tasks", page],
        queryFn: () => fetchTasks(page),
        placeholderData: keepPreviousData, // displaying previous data while fetching new data
      },
      {
        queryKey: ["tasks", filterPage, filter.filter],
        queryFn: () =>
          fetchTasksFiltered(filterPage, filter.type, filter.filter),
        placeholderData: keepPreviousData,
        enabled: filter.isActive,
      },
    ],
  });

  function handlePageCallback(data: number) {
    setPage(data);
    taskQuery.refetch();
  }

  function handleFilterPageCallback(data: number) {
    setFilterPage(data);
    filterTaskQuery.refetch();
  }

  if (isChecking) return <LoadingSpinner />

  if (taskQuery.isPending) return <span>Loading Tasks...</span>;
  if (taskQuery.isError) return <span>Error: {taskQuery.error.message}</span>;
  if (filter.isActive && filterTaskQuery.isPending)
    return <span>Loading Filter tasks...</span>;
  if (filter.isActive && filterTaskQuery.isError)
    return <span>Error: {filterTaskQuery.error.message}</span>;

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
        {filter.isActive && filterTaskQuery.data ? (
          <DataTable
            data={filterTaskQuery.data}
            page={filterPage}
            callback={handleFilterPageCallback}
          />
        ) : (
          <DataTable
            data={taskQuery.data}
            page={page}
            callback={handlePageCallback}
          />
        )}
      </div>
    </>
  );
}

export default Tasks;
