import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { TaskResponse } from "@/types/TaskType";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<TaskResponse>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} type="Description" />
    ),
    cell: (props) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {`${props.getValue()}`}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "due",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} type="Due Date" />
    ),
    cell: (props) => <p>{`${props.getValue()}`}</p>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} type="Created At" />
    ),
    cell: (props) => <p>{`${props.getValue()}`}</p>,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} type="Category" />
    ),
    cell: (props) => <p>{`${props.getValue()}`}</p>,
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} type="Priority" />
    ),
    cell: (props) => <p>{`${props.getValue()}`}</p>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} type="Status" />
    ),
    cell: (props) => <p>{`${props.getValue()}`}</p>,
  },
  {
    id: "actions",
    cell: () => <DataTableRowActions />,
  },
];
