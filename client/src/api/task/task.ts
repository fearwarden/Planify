import { ApiResponse, api } from "@/hooks/api";

export interface TaskResponse {
  id: string;
  description: string;
  due: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  category: string;
  priority: string;
  status: string;
}

export const fetchTasks = async (
  page = 1
): Promise<ApiResponse<TaskResponse>> => {
  const { data } = await api.get(`/api/v1/tasks?page=${page}`);
  return data;
};
