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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTaskMetadata } from "@/api/task/task";
import { useState } from "react";
import { api } from "@/hooks/api";
import { TaskDataType } from "@/types/TaskType";
import { TaskSchema } from "@/validation/schemas";
import { convertToTimestamp } from "@/tools/utils";

function CreateTaskModal({ isOpen, onClose }: ModalDataType) {
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<number>(0);
  const [priority, setPriority] = useState<number>(0);
  const [status, setStatus] = useState<number>(0);
  const [dueDate, setDueDate] = useState<string>("");
  const [dueTime, setDueTime] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const queryClient = useQueryClient();

  const { data, isError, isPending, error } = useQuery({
    queryKey: ["task-metadata"],
    queryFn: fetchTaskMetadata,
    enabled: isOpen,
  });

  const taskMutation = useMutation({
    mutationFn: (taskData: TaskDataType) => {
      return api.post("/api/v1/tasks", taskData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onClose();
    },
  });

  const handleCreateTask = () => {
    const due = convertToTimestamp(dueDate, dueTime);
    const taskData: TaskDataType = {
      description,
      categoryId: category,
      priorityId: priority,
      statusId: status,
      due,
    };
    const validation = TaskSchema.safeParse(taskData);
    if (!validation.success) {
      setErrorMessage(
        validation.error.message
          .slice(validation.error.message.search("message"))
          .split(":")[1]
          .split(",")[0]
      );
      return;
    }
    taskMutation.mutate(validation.data);
  };

  if (isPending) return <span>Loading...</span>;
  if (isError) return <span>Error: {error.message}</span>;
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
              <Input
                type="text"
                label="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <Select
                color="primary"
                label="Categories"
                placeholder="Select a category"
                onChange={(e) => setCategory(parseInt(e.target.value))}
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
                onChange={(e) => setPriority(parseInt(e.target.value))}
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
                onChange={(e) => setStatus(parseInt(e.target.value))}
              >
                {data.status.map((status) => (
                  <SelectItem key={status.id} value={status.id}>
                    {status.progress}
                  </SelectItem>
                ))}
              </Select>
              <div className="flex gap-4">
                <input
                  type="date"
                  onChange={(e) => setDueDate(e.target.value)}
                />
                <input
                  type="time"
                  onChange={(e) => setDueTime(e.target.value)}
                />
              </div>
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
