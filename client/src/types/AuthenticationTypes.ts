import { Role } from "@/enums/Role";
import {LoginSchema, RegisterSchema} from "@/validation/schemas";
import { z } from "zod";

export interface LoginResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  message: string;
}

export type LoginDataType = z.infer<typeof LoginSchema>;
export type RegisterDataType = z.infer<typeof RegisterSchema>;
