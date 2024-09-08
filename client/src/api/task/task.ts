import { ApiResponse, api } from "@/hooks/api";
import {
  TaskResponse,
  TaskMetadataResponse,
  TaskDataType,
  CompleteTaskMetadata,
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

export const fetchTasksFiltered = async (
  page = 1,
  type: string,
  criteria: string
): Promise<ApiResponse<TaskResponse>> => {
  const { data } = await api.get(
    `/api/v1/tasks/filter?${type}=${criteria}&page=${page}`
  );
  return data;
};

export const fetchSearchedTasks = async (
  params: string
): Promise<TaskResponse[]> => {
  const { data } = await api.get(`/api/v1/tasks/search?params=${params}`);
  return data;
};

export const editTask = async (args: {
  data: TaskDataType;
  id: string;
}): Promise<AxiosResponse> => {
  return await api.put(`/api/v1/tasks/${args.id}`, args.data);
};

export const completeTask = async (id: string): Promise<AxiosResponse> => {
  return await api.put(`/api/v1/tasks/complete/${id}`, null);
};

export const taskMetadataMetrics = async (): Promise<AxiosResponse> => {
  return await api.get("/api/v1/tasks/count-by-metadata");
};

export const completedTaskMetadata =
  async (): Promise<CompleteTaskMetadata> => {
    const data = await api.get("/api/v1/tasks/complete-metadata");
    return data.data;
  };
