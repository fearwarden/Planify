import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { ModalDataType } from "@/types/ModalDataType";
import { useQuery } from "@tanstack/react-query";
import { fetchTaskMetadata } from "@/api/task/task";

function CreateTaskModal({ isOpen, onClose }: ModalDataType) {
  const { data, isError, isPending, error } = useQuery({
    queryKey: ["task-metadata"],
    queryFn: fetchTaskMetadata,
    enabled: isOpen,
  });

  if (isPending) return <span>Loading...</span>;
  if (isError) return <span>Error: {error.message}</span>;
  const handleCreateTask = () => {};
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
      className="dark"
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-white">
              Create Task
            </ModalHeader>
            <ModalBody>
              <Input type="text" label="description" />
              <Select
                color="primary"
                label="Categories"
                placeholder="Select a category"
              >
                {data.categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </Select>
              <Select
                color="danger"
                label="Priorities"
                placeholder="Select a priority"
              >
                {data.priorities.map((priority) => (
                  <SelectItem key={priority.id} value={priority.id}>
                    {priority.level}
                  </SelectItem>
                ))}
              </Select>
              <Select
                color="success"
                label="Status"
                placeholder="Select a status"
              >
                {data.status.map((status) => (
                  <SelectItem key={status.id} value={status.id}>
                    {status.progress}
                  </SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={handleCreateTask}>
                Create Task
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default CreateTaskModal;
