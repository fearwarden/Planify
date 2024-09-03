import {ProjectResponse} from "@/types/ProjectType.ts";
import {api} from "@/hooks/api.ts";

const PROJECTS_PREFIX = "/api/v1/projects";

export const getProjects = async (): Promise<[ProjectResponse]> => {
    const { data } = await api.get(`${PROJECTS_PREFIX}`);
    return data;
}