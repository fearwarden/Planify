import {
  Cross2Icon,
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
  DesktopIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataTableFacetedFilter from "./data-table-faceted-filter";

export const categories = [
  {
    value: "Work",
    label: "work",
    icon: DesktopIcon,
  },
];

export const statuses = [
  {
    value: "COMPLETE",
    label: "Complete",
    icon: CheckCircledIcon,
  },
  {
    value: "PROGRESS",
    label: "Progress",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "ON HOLD",
    label: "On Hold",
    icon: StopwatchIcon,
  },
];

export const priorities = [
  {
    label: "HIGH",
    value: "HIGH",
    icon: ArrowUpIcon,
  },
  {
    label: "MEDIUM",
    value: "MEDIUM",
    icon: ArrowRightIcon,
  },
  {
    label: "LOW",
    value: "LOW",
    icon: ArrowDownIcon,
  },
];

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={
            (table.getColumn("description")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("description")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("category") && (
          <DataTableFacetedFilter
            column={table.getColumn("category")}
            type="category"
            options={categories}
          />
        )}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            type="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            type="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default DataTableToolbar;
