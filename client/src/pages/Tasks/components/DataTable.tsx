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

interface DataTableProps {
  data: ApiResponse<TaskResponse>;
  page: number;
}

function DataTable({ data, page }: DataTableProps) {
  return (
    <div className="space-y-4">
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        page={page}
        pageSize={data.size}
        totalPageNumber={data.totalPages}
      />
    </div>
  );
}

export default DataTable;
