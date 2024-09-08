import {z} from "zod";
import {ProjectSchema, WorkSchema} from "@/validation/schemas.ts";
import {IUser} from "@/types/UserTypes.ts";
import {StatusType} from "@/types/TaskType.ts";

export interface ProjectResponse {
    id: string;
    name: string;
    iconPath: string;
    url?: string;
    status: ProjectStatus;
    createdAt: string;
    updatedAt: number[];
}

export interface WorkResponse {
    id: string;
    title: string;
    targetDate: string;
    description: string;
    createdAt: string;
    typeDto: TypeResponse;
    statusDto: StatusType;
    assignee: MembershipResponse;
}

export interface TypeResponse {
    id: string;
    type: string;
}

export interface MembershipResponse {
    id: string;
    projectRole: ProjectRole,
    userDto: IUser,
    projectDto: ProjectResponse
}

export enum ProjectStatus {
    STALE = "STALE",
    BUILDING = "BUILDING",
    LIVE = "LIVE",
    ARCHIVED = "ARCHIVED",
}

export enum ProjectRole {
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
    "VIEWER" = "VIEWER"
}

export type ProjectDataType = z.infer<typeof ProjectSchema>;
export type WorkType = z.infer<typeof WorkSchema>;