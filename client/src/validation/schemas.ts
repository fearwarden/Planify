import { z } from "zod";

export const TaskSchema = z.object({
  description: z
    .string()
    .min(1, { message: "Description is required." })
    .max(255, { message: "Description should be less then 255 characters." }),
  categoryId: z.number().min(1, { message: "Category is required." }),
  priorityId: z.number().min(1, { message: "Priority is required." }),
  statusId: z.number().min(1, { message: "Status is required." }),
  due: z.string().min(15, { message: "Invalid due date." }),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
