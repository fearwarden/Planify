import {z} from "zod";
import {EditWorkSchema, ProjectSchema, WorkSchema} from "@/validation/schemas.ts";
import {IUser} from "@/types/UserTypes.ts";
import {StatusEnum, StatusType} from "@/types/TaskType.ts";

export interface ProjectResponse {
    id: string;
    name: string;
    iconPath: string;
    url?: string;
    status: ProjectStatus;
    createdAt: number[];
    updatedAt: number[];
}

export interface WorkResponse {
    id: string;
    title: string;
    targetDate: number[];
    description: string;
    createdAt: number[];
    workOrder: number;
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

export interface ColumnType {
    id: number;
    status: StatusEnum;
}

export type ProjectDataType = z.infer<typeof ProjectSchema>;
export type WorkType = z.infer<typeof WorkSchema>;
export type EditWorkDataType = z.infer<typeof EditWorkSchema>;

export interface EditWorkDataTypeApi {
    workId: string;
    data: EditWorkDataType
}

export interface WorkUpdateStatusAndOrderDto {
    statusProgress: string;
    workOrder: number
}

export interface WorkUpdateStatusAndOrderAPi {
    workId: string;
    data: WorkUpdateStatusAndOrderDto
}

