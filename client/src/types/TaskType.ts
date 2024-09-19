import { TaskSchema } from "@/validation/schemas";
import { z } from "zod";

export interface TaskResponse {
  id: string;
  description: string;
  due: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  category: CategoryType;
  priority: PriorityType;
  status: StatusType;
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

export enum StatusEnum {
  ON_HOLD = "ON HOLD",
  TO_DO = "TO DO",
  PROGRESS = "PROGRESS",
  COMPLETE = "COMPLETE"
}

export type TaskDataType = z.infer<typeof TaskSchema>;

export enum TaskStatus {
  COMPLETE = "COMPLETE",
  PROGRESS = "PROGRESS",
  ONHOLD = "ON HOLD",
}

export enum TaskCategory {
  WORK = "Work",
  PERSONAL = "Personal",
  HEALTH = "Health",
  EDUCATION = "Education",
  HOME = "Home",
  FINANCE = "Finance",
  URGENT = "Urgent",
  IDEAS = "Ideas",
  GAMES = "Games",
  OTHER = "Other",
}

export enum TaskPriority {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export enum TaskMetadata {
  STATUS = "status",
  CATEGORY = "category",
  PRIORITY = "priority",
}

export type CompleteTaskMetadata = {
  completedTasks: number;
  totalNumberOfTasks: number;
};
