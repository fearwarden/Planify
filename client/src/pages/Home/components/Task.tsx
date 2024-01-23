import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from "@nextui-org/react";

function Task() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="max-w-[400px] rounded-[28px]">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-lg">Nositi Sovi stvari</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>Make beautiful websites regardless of your design experience.</p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button color="danger">Click me</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Task;
