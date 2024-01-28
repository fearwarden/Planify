import { z } from "zod";

export const TaskSchema = z.object({
  description: z.string(),
  categoryId: z.number().min(1),
  priorityId: z.number().min(1),
  statusId: z.number().min(1),
  due: z.string().min(15),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
