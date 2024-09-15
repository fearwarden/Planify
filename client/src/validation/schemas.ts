import {z} from "zod";
import {Role} from "@/enums/Role.ts";

export const UserSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    role: z.nativeEnum(Role)
});

export const TaskSchema = z.object({
    description: z
        .string()
        .min(1, {message: "Description is required."})
        .max(255, {message: "Description should be less then 255 characters."}),
    categoryId: z.number().min(1, {message: "Category is required."}),
    priorityId: z.number().min(1, {message: "Priority is required."}),
    statusId: z.number().min(1, {message: "Status is required."}),
    due: z.string().min(15, {message: "Invalid due date."}),
});

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const RegisterSchema = z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string()
        .min(6, {message: "Password should be at least 6 characters."})
        .max(16, {message: "Password shouldn't exceed 16 characters."}),
    confirmationPassword: z.string()
        .min(6, {message: "Confirmation Password should be at least 6 characters."})
        .max(16, {message: "Confirmation Password shouldn't exceed 16 characters."}),
}).superRefine(({ password, confirmationPassword }, ctx) => {
    if (password !== confirmationPassword) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match",
        })
    }
})

export const ProjectSchema = z.object({
    name: z.string().min(1),
    employees: z.array(UserSchema).nullable()
});

const TypeSchema = z.object({
    id: z.string(),
    type: z.string()
})

const StatusSchema = z.object({
    id: z.number(),
    progress: z.string()
})

export const WorkSchema = z.object({
    title: z.string(),
    targetDate: z.string(),
    description: z.string(),
    projectId: z.string(),
    type: TypeSchema,
    status: StatusSchema,
    user: UserSchema
})

export const EditWorkSchema = z.object({
    title: z.string(),
    targetDate: z.string(),
    description: z.string(),
    typeId: z.string(),
    statusId: z.number(),
    assigneeId: z.string()
})
