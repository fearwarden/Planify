import {Role} from "@/enums/Role.ts";

export interface IUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
}