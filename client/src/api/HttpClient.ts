import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

export default class HttpClient {
  protected instance: AxiosInstance | undefined;

  protected createInstance(): AxiosInstance {
    this.instance = axios.create({
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    this.initializeResponseInterceptor();
    return this.instance;
  }

  /*
   * Response interceptor
   */
  private initializeResponseInterceptor = () => {
    this.instance?.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
  };

  private handleResponse = ({ data }: AxiosResponse) => data;
  private handleError = async (error: AxiosError) => {
    if (error.response?.status === 406) {
      const originalRequest = error.config;
      try {
        await this.refreshToken();
        return this.instance!(originalRequest!);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  };

  private async refreshToken() {
    try {
      await this.instance?.post("/api/v1/auth/refresh");
    } catch (e) {
      console.log(e);
    }
  }
}
