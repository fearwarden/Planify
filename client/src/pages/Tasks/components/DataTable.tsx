import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TaskResponse } from "@/types/TaskType";
import DataTablePagination from "./DataTablePagination";
import { ApiResponse } from "@/hooks/api";
import DataTableToolbar from "./DataTableToolbar";
import DataTableRowAction from "./DataTableRowAction";

interface DataTableProps {
  data: ApiResponse<TaskResponse>;
  page: number;
  callback: (data: number) => void;
}

function DataTable({ data, page, callback }: DataTableProps) {
  return (
    <div className="space-y-4">
      <DataTableToolbar />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.content.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.due}</TableCell>
                <TableCell>{task.createdAt}</TableCell>
                <TableCell>{task.category}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <DataTableRowAction data={task} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        page={page}
        totalPageNumber={data.totalPages}
        callback={callback}
      />
    </div>
  );
}

export default DataTable;
