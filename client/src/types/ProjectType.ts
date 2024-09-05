import {z} from "zod";
import {ProjectSchema} from "@/validation/schemas.ts";

export interface ProjectResponse {
    id: string;
    name: string;
    iconPath: string;
    url?: string;
    status: ProjectStatus;
    createdAt: string;
    updatedAt: string;
}

export enum ProjectStatus {
    STALE = "STALE",
    BUILDING = "BUILDING",
    LIVE = "LIVE",
    ARCHIVED = "ARCHIVED",
}

export type ProjectDataType = z.infer<typeof ProjectSchema>;