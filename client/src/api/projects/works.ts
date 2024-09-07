import {WorkType} from "@/types/ProjectType.ts";
import {api} from "@/hooks/api.ts";

export const createWork = async (body: WorkType) => {
    return await api.post("/api/v1/works", body);
}