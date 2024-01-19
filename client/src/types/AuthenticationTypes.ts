export interface LoginResponse {
  id: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  message: string;
}
