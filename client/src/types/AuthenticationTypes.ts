import { Role } from "@/enums/Role";

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
