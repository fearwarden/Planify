import {MembershipResponse, ProjectDataType, ProjectResponse, TypeResponse} from "@/types/ProjectType.ts";
import {api} from "@/hooks/api.ts";
import {StatusType} from "@/types/TaskType.ts";

const PROJECTS_PREFIX = "/api/v1/projects";
const METADATA_PREFIX = "/api/v1/metadata";

export const getProjects = async (): Promise<[ProjectResponse]> => {
    const { data } = await api.get(`${PROJECTS_PREFIX}`);
    return data;
}

export const createProject = async (payload: ProjectDataType) => {
    return await api.post(`${PROJECTS_PREFIX}`, payload);
}

export const getProject = async (projectId: string): Promise<ProjectResponse> => {
    const { data } = await api.get(`${PROJECTS_PREFIX}/${projectId}`);
    return data;
}

export const getAllTypes = async (): Promise<TypeResponse[]> => {
    const { data } = await api.get(`${METADATA_PREFIX}/type`);
    return data;
}

export const getMembershipsForProject = async (projectId: string): Promise<MembershipResponse[]> => {
    const { data } = await api.get(`/api/v1/memberships/${projectId}`);
    return data;
}

export const getStatuses = async (): Promise<StatusType[]> => {
    const { data } = await api.get(`${METADATA_PREFIX}/status`)
    return data;
}