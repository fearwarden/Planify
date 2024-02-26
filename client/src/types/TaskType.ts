import { TaskSchema } from "@/validation/schemas";
import { z } from "zod";

export interface TaskResponse {
  id: string;
  description: string;
  due: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  category: string;
  priority: string;
  status: string;
}

export interface TaskMetadataResponse {
  categories: [CategoryType];
  priorities: [PriorityType];
  status: [StatusType];
}

export type CategoryType = {
  id: number;
  name: string;
};

export type PriorityType = {
  id: number;
  level: string;
};

export type StatusType = {
  id: number;
  progress: string;
};

export type TaskDataType = z.infer<typeof TaskSchema>;
