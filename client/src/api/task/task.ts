import { ApiResponse, api } from "@/hooks/api";
import {
  TaskResponse,
  TaskMetadataResponse,
  TaskDataType,
} from "@/types/TaskType";
import { AxiosResponse } from "axios";

export const fetchTasks = async (
  page = 1
): Promise<ApiResponse<TaskResponse>> => {
  const { data } = await api.get(`/api/v1/tasks?page=${page}`);
  return data;
};

export const fetchTaskMetadata = async (): Promise<TaskMetadataResponse> => {
  const { data } = await api.get("/api/v1/tasks/metadata");
  return data;
};

export const createTask = async (
  data: TaskDataType
): Promise<AxiosResponse> => {
  return await api.post("/api/v1/tasks", data);
};

export const deleteTask = async (id: string) => {
  return await api.delete(`/api/v1/tasks/${id}`);
};
