import { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { completedTaskMetadata } from "@/api/task/task";

interface DataTablePaginationProps {
  page: number;
  totalPageNumber: number;
  callback: (data: number) => void;
}

function DataTablePagination({
  page,
  totalPageNumber,
  callback,
}: DataTablePaginationProps) {
  const [localPage, setLocalPage] = useState<number>(page);

  const { data, isError, isPending, error } = useQuery({
    queryKey: ["tasks", "completed-metadata"],
    queryFn: completedTaskMetadata,
  });

  function handleNextPage() {
    if (localPage >= totalPageNumber || page >= totalPageNumber) return;
    const tempPage = localPage + 1;
    callback(tempPage);
    setLocalPage(tempPage);
  }
  function handlePreviousPage() {
    if (localPage <= 1 || page <= 1) return;
    const tempPage = localPage - 1;
    callback(localPage - 1);
    setLocalPage(tempPage);
  }
  function jumpToLastPage() {
    callback(totalPageNumber);
    setLocalPage(totalPageNumber);
  }
  function jumpToFirstPage() {
    callback(1);
    setLocalPage(1);
  }

  if (isPending) return <span>Loading...</span>;
  if (isError) return <span>Error: {error.message}</span>;
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {data.completedTasks} of {data.totalNumberOfTasks} tasks completed.
      </div>
      <div className="flex items-center space-x-1">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {page} of {totalPageNumber}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={jumpToFirstPage}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handlePreviousPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handleNextPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={jumpToLastPage}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataTablePagination;
