import { useState } from "react";
import { keepPreviousData, useQueries } from "@tanstack/react-query";
import { fetchTasks, fetchTasksFiltered } from "@/api/task/task";
import Task from "./Task";
import { Button } from "@nextui-org/react";
import { IsFilterActiveProps } from "@/components/Navigations/SideBar";
import { useContextMenu } from "@/hooks/useContextMenu";
import ContextMenu from "@/components/ContextMenu/ContextMenu";

function Tasks({ isActive, type, criteria }: IsFilterActiveProps) {
  const [page, setPage] = useState<number>(1);
  const [filterPage, setFilterPage] = useState<number>(1);
  const { clicked, setClicked, mouseCoords, setMouseCoords } = useContextMenu();

  const [taskQuery, filterTaskQuery] = useQueries({
    queries: [
      {
        queryKey: ["tasks", page],
        queryFn: () => fetchTasks(page),
        placeholderData: keepPreviousData, // displaying previous data while fetching new data
      },
      {
        queryKey: ["tasks", filterPage, criteria],
        queryFn: () => fetchTasksFiltered(filterPage, type, criteria),
        placeholderData: keepPreviousData,
        enabled: isActive,
      },
    ],
  });

  const handleNextPage = () => {
    if (!taskQuery.isPlaceholderData && taskQuery.data!.totalPages > page) {
      setPage((old) => old + 1);
    }
  };

  const handleFilterNextPage = () => {
    if (
      !filterTaskQuery.isPlaceholderData &&
      filterTaskQuery.data!.totalPages > filterPage
    ) {
      setFilterPage((old) => old + 1);
    }
  };

  const handlePreviousPage = () => setPage((old) => Math.max(old - 1, 0));
  const handleFilterPreviousPage = () =>
    setFilterPage((old) => Math.max(old - 1, 0));

  if (taskQuery.isPending) return <span>Loading...</span>;
  if (taskQuery.isError) return <span>Error: {taskQuery.error.message}</span>;

  if (isActive && filterTaskQuery.isPending) return <span>Loading...</span>;
  if (isActive && filterTaskQuery.isError)
    return <span>Error: {filterTaskQuery.error.message}</span>;
  return (
    <>
      <div className="p-5 grid grid-cols-3 gap-4 overflow-y-scroll">
        {isActive && filterTaskQuery.data && filterTaskQuery.data.content
          ? filterTaskQuery.data.content.map((task) => (
              <div className="pb-5">
                <Task
                  id={task.id}
                  description={task.description}
                  due={task.due}
                  createdAt={task.createdAt}
                  category={task.category}
                  priority={task.priority}
                  status={task.status}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setClicked(true);
                    setMouseCoords({ x: e.pageX, y: e.pageY });
                  }}
                />
              </div>
            ))
          : taskQuery.data.content.map((task) => (
              <div className="pb-5">
                <Task
                  id={task.id}
                  description={task.description}
                  due={task.due}
                  createdAt={task.createdAt}
                  category={task.category}
                  priority={task.priority}
                  status={task.status}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setClicked(true);
                    setMouseCoords({ x: e.pageX, y: e.pageY });
                  }}
                />
              </div>
            ))}
        <div className="flex gap-2">
          {isActive ? (
            <>
              <Button
                color="primary"
                onClick={handleFilterPreviousPage}
                isDisabled={filterPage <= 1}
              >
                Previous page
              </Button>
              <Button
                color="primary"
                onClick={handleFilterNextPage}
                isDisabled={
                  filterTaskQuery.isPlaceholderData ||
                  (filterTaskQuery.data?.totalPages
                    ? filterTaskQuery.data?.totalPages <= filterPage
                    : false)
                }
              >
                {filterPage} of {filterTaskQuery.data?.totalPages} pages / Next
                page...
              </Button>
            </>
          ) : (
            <>
              <Button
                color="primary"
                onClick={handlePreviousPage}
                isDisabled={page <= 1}
              >
                Previous page
              </Button>
              <Button
                color="primary"
                onClick={handleNextPage}
                isDisabled={
                  taskQuery.isPlaceholderData ||
                  taskQuery.data.totalPages <= page
                }
              >
                {page} of {taskQuery.data.totalPages} pages / Next page...
              </Button>
            </>
          )}
        </div>
        {clicked && (
          <ContextMenu
            top={mouseCoords.y}
            left={mouseCoords.x}
            children={
              <ul>
                <li>Edit</li>
                <li>Copy</li>
                <li>Delete</li>
              </ul>
            }
          ></ContextMenu>
        )}
      </div>
    </>
  );
}

export default Tasks;
