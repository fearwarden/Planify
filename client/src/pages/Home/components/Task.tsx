import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Chip,
} from "@nextui-org/react";

interface TaskData {
  description: string;
  due: Date;
  createdAt: Date;
  category: string;
  priority: string;
  status: string;
}

function Task({
  description,
  due,
  createdAt,
  category,
  priority,
  status,
}: TaskData) {
  return (
    <Card className="max-w-[400px] rounded-[28px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-lg">{description}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Due date: {due.toString()}</p>
        <p>Created at: {createdAt.toString()}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex items-end gap-4">
          <Chip color="primary">{category}</Chip>
          <Chip color="danger">{priority}</Chip>
          <Chip color="success">{status}</Chip>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Task;
