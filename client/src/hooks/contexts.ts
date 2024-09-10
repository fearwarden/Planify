import {createContext} from "react";
import {MembershipResponse, TypeResponse} from "@/types/ProjectType.ts";
import {StatusType} from "@/types/TaskType.ts";

export type ProjectMetadataContextType = {
    types: TypeResponse[],
    memberships: MembershipResponse[],
    statuses: StatusType[]
}

export const ProjectMetadataContext = createContext<ProjectMetadataContextType | null>(null);