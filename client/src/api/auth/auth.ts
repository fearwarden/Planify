import {LoginDataType, LoginResponse, RegisterDataType, RegisterResponse} from "@/types/AuthenticationTypes.ts";
import {api} from "@/hooks/api.ts";

const AUTH_PREFIX_URL = "/api/v1/auth";

export const loginApi = async (data: LoginDataType): Promise<LoginResponse> => {
    const payload = await api.post(`${AUTH_PREFIX_URL}/login`, data);
    return payload.data;
}

export const registerApi = async (data: RegisterDataType): Promise<RegisterResponse> => {
    return await api.post(`${AUTH_PREFIX_URL}/register`, data);
}

export const logoutApi = async () => {
    return await api.get(`${AUTH_PREFIX_URL}/logout`);
}