import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { keepPreviousData, useQueries } from "@tanstack/react-query";
import { fetchTasks, fetchTasksFiltered } from "@/api/task/task";
import Task from "./Task";
import { Button, Pagination, useDisclosure } from "@nextui-org/react";
import { IsFilterActiveProps } from "@/components/Navigations/SideBar";
import { useContextMenu } from "@/hooks/useContextMenu";
import ContextMenu from "@/components/ContextMenu/ContextMenu";
import { TaskResponse } from "@/types/TaskType";
import EditTaskModal from "../modals/EditTaskModal";
import { deleteTask } from "@/api/task/task";

function Tasks({ isActive, type, criteria }: IsFilterActiveProps) {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);
  const [filterPage, setFilterPage] = useState<number>(1);
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskResponse | null>(null);
  const { isTaskSelected, setIsTaskSelected, mouseCoords, setMouseCoords } =
    useContextMenu(contextMenuRef);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [taskQuery, filterTaskQuery] = useQueries({
    queries: [
      {
        queryKey: ["tasks", page],
        queryFn: () => fetchTasks(page),
        placeholderData: keepPreviousData, // displaying previous data while fetching new data
      },
      {
        queryKey: ["tasks", filterPage, criteria],
        queryFn: () => fetchTasksFiltered(filterPage, type, criteria),
        placeholderData: keepPreviousData,
        enabled: isActive,
      },
    ],
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleContextMenuEdit = () => {
    onOpen();
    setIsTaskSelected(false);
  };
  const handleDeleteTaskContextMenu = () => {
    if (!selectedTask) return;
    deleteTaskMutation.mutate(selectedTask.id);
    setIsTaskSelected(false);
  };

  if (taskQuery.isPending) return <span>Loading...</span>;
  if (taskQuery.isError) return <span>Error: {taskQuery.error.message}</span>;

  if (isActive && filterTaskQuery.isPending) return <span>Loading...</span>;
  if (isActive && filterTaskQuery.isError)
    return <span>Error: {filterTaskQuery.error.message}</span>;
  return (
    <>
      <div className="p-5 grid grid-cols-3 gap-4 overflow-y-scroll">
        {isActive && filterTaskQuery.data && filterTaskQuery.data.content
          ? filterTaskQuery.data.content.map((task) => (
              <div className="pb-5" key={task.id}>
                <Task
                  id={task.id}
                  description={task.description}
                  due={task.due}
                  createdAt={task.createdAt}
                  category={task.category}
                  priority={task.priority}
                  status={task.status}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setIsTaskSelected(true);
                    setMouseCoords({ x: e.pageX, y: e.pageY });
                    setSelectedTask(task);
                  }}
                />
              </div>
            ))
          : taskQuery.data.content.map((task) => (
              <div className="pb-5" key={task.id}>
                <Task
                  id={task.id}
                  description={task.description}
                  due={task.due}
                  createdAt={task.createdAt}
                  category={task.category}
                  priority={task.priority}
                  status={task.status}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setIsTaskSelected(true);
                    setMouseCoords({ x: e.pageX, y: e.pageY });
                    setSelectedTask(task);
                  }}
                />
              </div>
            ))}
        <div className="flex gap-2">
          {isActive ? (
            <Pagination
              initialPage={1}
              page={filterPage}
              total={filterTaskQuery.data!.totalPages}
              onChange={(nextPage) => setFilterPage(nextPage)}
            />
          ) : (
            <Pagination
              initialPage={1}
              page={page}
              total={taskQuery.data.totalPages}
              onChange={(nextPage) => setPage(nextPage)}
            />
          )}
        </div>
        {isTaskSelected && (
          <ContextMenu
            top={mouseCoords.y}
            left={mouseCoords.x}
            contextMenuRef={contextMenuRef}
            children={
              <div className="flex flex-col gap-4 items-center">
                <Button
                  color="default"
                  variant="light"
                  onClick={handleContextMenuEdit}
                >
                  Edit
                </Button>
                <Button
                  color="default"
                  variant="light"
                  onClick={handleDeleteTaskContextMenu}
                >
                  Delete
                </Button>
                <Button color="default" variant="light">
                  Complete
                </Button>
              </div>
            }
          />
        )}
        <EditTaskModal onClose={onClose} isOpen={isOpen} />
      </div>
    </>
  );
}

export default Tasks;
