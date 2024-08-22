// TODO: move login function here, and create register api function

import {RegisterDataType, RegisterResponse} from "@/types/AuthenticationTypes.ts";
import {api} from "@/hooks/api.ts";

const AUTH_PREFIX_URL = "/api/v1/auth";

export const register = async (data: RegisterDataType): Promise<RegisterResponse> => {
    return await api.post(`${AUTH_PREFIX_URL}/register`, data);
}

export const logout = async () => {
    return await api.get(`${AUTH_PREFIX_URL}/logout`);
}