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
  Chip,
} from "@nextui-org/react";
import { ModalDataType } from "@/types/ModalDataType";
import { TaskDataType, TaskResponse } from "@/types/TaskType";
import { useEffect, useState } from "react";
import { convertToTimestamp, formatDate } from "@/tools/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editTask, fetchTaskMetadata } from "@/api/task/task";
import { AxiosResponse } from "axios";
import { TaskSchema } from "@/validation/schemas";
import { useNavigate } from "react-router-dom";

interface EditModalProps extends ModalDataType, TaskResponse {}

function EditTaskModal({
  isOpen,
  onClose,
  id,
  description,
  due,
  createdAt,
  category,
  priority,
  status,
}: EditModalProps) {
  const [editedDescription, setEditedDescription] =
    useState<string>(description);
  const [dueDate, setDueDate] = useState<string>("");
  const [dueTime, setDueTime] = useState<string>("");
  const [editedCategory, setEditedCategory] = useState<number | null>();
  const [editedPriority, setEditedPriority] = useState<number | null>();
  const [editedStatus, setEditedStatus] = useState<number | null>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isError, isPending, isLoading, error } = useQuery({
    queryKey: ["task-metadata"],
    queryFn: fetchTaskMetadata,
    enabled: isOpen,
  });

  const editTaskMutation = useMutation({
    mutationFn: editTask,
    onError: (error: AxiosResponse) => {
      setErrorMessage(error.request.response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleTaskEdit = () => {
    if (!data) return;
    let editedDue = convertToTimestamp(dueDate, dueTime);
    if (editedDue.length < 2) {
      editedDue = due;
    }
    const payload: TaskDataType = {
      description: editedDescription,
      due: editedDue,
      categoryId:
        editedCategory ??
        data.categories.filter((cat) => cat.name === category)[0].id,
      priorityId:
        editedPriority ??
        data.priorities.filter((prio) => prio.level === priority)[0].id,
      statusId:
        editedStatus ?? data.status.filter((s) => s.progress === status)[0].id,
    };
    const validation = TaskSchema.safeParse(payload);
    if (!validation.success) {
      setErrorMessage(
        JSON.parse(
          validation.error.message
            .slice(validation.error.message.search("message"))
            .split(":")[1]
            .split(",")[0]
        )
      );
      return;
    }
    editTaskMutation.mutate({ data: validation.data, id });
    navigate(0);
  };

  useEffect(() => {
    if (!isOpen) {
      setEditedDescription(description);
    }
  });

  if (isPending) return;
  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error: {error.message}</span>;
  return (
    <div className="overflow-hidden">
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
              <ModalHeader className="flex justify-between text-white">
                <p className="text-lg">Edit Task</p>
                <p className="mx-2">{formatDate(createdAt)}</p>
              </ModalHeader>
              <ModalBody>
                <Input
                  className="text-white"
                  label="Description"
                  variant="bordered"
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />

                <Select
                  color="primary"
                  label="Categories"
                  placeholder={category}
                  onChange={(e) => setEditedCategory(parseInt(e.target.value))}
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
                  placeholder={priority}
                  onChange={(e) => setEditedPriority(parseInt(e.target.value))}
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
                  placeholder={status}
                  onChange={(e) => setEditedStatus(parseInt(e.target.value))}
                >
                  {data.status.map((status) => (
                    <SelectItem key={status.id} value={status.id}>
                      {status.progress}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  label="Due Date"
                  className="text-white"
                  variant="underlined"
                  value={formatDate(due)}
                  isDisabled
                />
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
                {errorMessage && <Chip color="danger">{errorMessage}</Chip>}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={handleTaskEdit}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default EditTaskModal;
