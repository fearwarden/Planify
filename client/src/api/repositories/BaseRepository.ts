import { AxiosResponse } from "axios";

export interface IBaseRepository<T> {
  get(id: string | number): Promise<ApiResponse<T>>;
  getMany(): Promise<ApiResponse<T[]>>;
  create(data: T): Promise<ApiResponse<T>>;
  update(id: string | number, data: T): Promise<ApiResponse<T>>;
  delete(id: string | number): Promise<ApiResponse<T>>;
}

export class ApiResponse<T> {
  data?: T;
  error?: { message: string };
}

//TODO: consider adding error field in response, so you can properly handle errors
export const transform = (
  response: AxiosResponse
): Promise<ApiResponse<any>> => {
  return new Promise((resolve, reject) => {
    if (response.status >= 400) {
      const errorResponse: ApiResponse<any> = {
        error: response.data.message || "An error occurred",
      };
      resolve(errorResponse);
    } else {
      const result: ApiResponse<any> = {
        data: response,
      };
      resolve(result);
    }
  });
};
