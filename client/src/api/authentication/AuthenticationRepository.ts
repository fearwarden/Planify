import HttpClient from "@/api/HttpClient";
import { transform } from "../repositories/BaseRepository";
import { LoginResponse, RegisterResponse } from "@/types/AuthenticationTypes";

export class AuthenticationRepository extends HttpClient {
  private collection: string = "/api/v1/auth";
  protected axiosInstance = this.createInstance();

  public async login(email: string, password: string): Promise<LoginResponse> {
    const result = await this.axiosInstance
      .post(`${this.collection}/login`, {
        email,
        password,
      })
      .then(transform);
    return result.data;
  }

  public async register(
    email: string,
    password: string,
    username: string
  ): Promise<RegisterResponse> {
    const result = await this.axiosInstance
      .post(`${this.collection}/register`, {
        email,
        password,
        username,
      })
      .then(transform);
    return result.data;
  }
}
