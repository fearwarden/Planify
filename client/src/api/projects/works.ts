import {
    EditWorkDataTypeApi,
    WorkResponse,
    WorkType,
    WorkUpdateStatusAndOrderAPi,
} from "@/types/ProjectType.ts";
import {api} from "@/hooks/api.ts";

const WORK_PREFIX = "/api/v1/works"

export const createWork = async (body: WorkType) => {
    return await api.post(WORK_PREFIX, body);
}

export const getWorksForProject = async (projectId: string): Promise<WorkResponse[]> => {
    const { data } = await api.get(`${WORK_PREFIX}/${projectId}`);
    return data;
}

export const editWork = async ({workId, data}: EditWorkDataTypeApi) => {
    return await api.put(`${WORK_PREFIX}/${workId}`, data);
}

export const updateWorkStatusAndOrder = async ({ workId, data }: WorkUpdateStatusAndOrderAPi) => {
    return await api.put(`${WORK_PREFIX}/${workId}/update-status-order`, data);
}

export const deleteWork = async (workId: string) => {
    return await api.delete(`${WORK_PREFIX}/${workId}`)
}