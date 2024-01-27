import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/api/task/task";
import Task from "./Task";
import { Button } from "@nextui-org/react";

function Tasks() {
  const [page, setPage] = useState<number>(1);
  const { data, isError, isPending, error, isPlaceholderData } = useQuery({
    queryKey: ["tasks", page],
    queryFn: () => fetchTasks(page),
    placeholderData: keepPreviousData, // displaying previous data while fetching new data
  });

  const handleNextPage = () => {
    if (!isPlaceholderData && data!.totalPages > page) {
      setPage((old) => old + 1);
    }
  };

  const handlePreviousPage = () => setPage((old) => Math.max(old - 1, 0));

  if (isPending) return <span>Loading...</span>;
  if (isError) return <span>Error: {error.message}</span>;
  return (
    <>
      <div className="p-5 grid grid-cols-3 gap-4 overflow-y-scroll">
        {data.content.map((task) => (
          <div className="pb-5">
            <Task
              description={task.description}
              due={task.due}
              createdAt={task.createdAt}
              category={task.category}
              priority={task.priority}
              status={task.status}
            />
          </div>
        ))}
        <div className="flex gap-2">
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
            isDisabled={isPlaceholderData || data.totalPages <= page}
          >
            {page} of {data.totalPages} pages / Next page...
          </Button>
        </div>
      </div>
    </>
  );
}

export default Tasks;
