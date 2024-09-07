import {z} from "zod";
import {UserSchema} from "@/validation/schemas.ts";

export type IUser = z.infer<typeof UserSchema>;