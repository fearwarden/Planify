import { ApiResponse, api } from "@/hooks/api";
import { TaskResponse, TaskMetadataResponse } from "@/types/TaskType";

export const fetchTasks = async (
  page = 1
): Promise<ApiResponse<TaskResponse>> => {
  const { data } = await api.get(`/api/v1/tasks?page=${page}`);
  return data;
};

export const fetchTaskMetadata = async (): Promise<TaskMetadataResponse> => {
  const { data } = await api.get("/api/v1/tasks/metadata");
  console.log(data);
  return data;
};
