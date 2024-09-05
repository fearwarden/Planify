import {IUser} from "@/types/UserTypes.ts";
import {api} from "@/hooks/api.ts";

const USER_PREFIX = "/api/v1/users"

export const getAllUsers = async (): Promise<IUser[]> => {
    const { data } = await api.get(`${USER_PREFIX}/all`);
    return data;
}