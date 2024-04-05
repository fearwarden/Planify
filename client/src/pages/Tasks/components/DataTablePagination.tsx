import { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface DataTablePaginationProps {
  page: number;
  totalPageNumber: number;
  pageSize: number;
}

function DataTablePagination({
  page,
  pageSize,
  totalPageNumber,
}: DataTablePaginationProps) {
  const [pageSizeState, setPageSizeState] = useState<number>(pageSize);
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        10 of 100 tasks completed.
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            defaultValue={`${pageSizeState}`}
            onValueChange={(value) => setPageSizeState(parseInt(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSizeState} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((el) => (
                <SelectItem key={el} value={`${el}`}>
                  {el}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {page} of {totalPageNumber}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex">
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0">
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0">
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex">
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataTablePagination;
