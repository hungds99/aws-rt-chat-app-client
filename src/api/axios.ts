import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { HTTPCode } from "../shared/common/enum";
import { Response } from "../shared/interface/common";

export class AxiosServices {
  static instance: AxiosServices;
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:3000",
      withCredentials: true,
    });

    this.axiosInstance.interceptors.request.use(
      (_config: AxiosRequestConfig) => {
        const token: string | null = localStorage.getItem("accessToken");
        if (token) {
          _config.headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
        }
        return _config;
      },
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        // Do something with response data
        const { code, data }: Response = response.data;
        if (code === HTTPCode.OK) {
          return data;
        }
      },
      async (error) => {
        // Do something with response error
        if (error?.response?.status === 401) {
          localStorage.removeItem("accessToken");
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            try {
              const response = await this.axiosInstance.post("auth/refresh", {
                refreshToken,
              });
              localStorage.setItem("accessToken", response.data.accessToken);
              localStorage.setItem("refreshToken", response.data.refreshToken);
              return await this.axiosInstance.request(error.config);
            } catch (error) {
              return Promise.reject(error);
            }
          }
        }
        return Promise.reject(error);
      },
    );
  }

  public static getInstance(): AxiosServices {
    if (!this.instance) {
      this.instance = new AxiosServices();
    }
    return this.instance;
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig | undefined,
  ): Promise<T> {
    return await this.axiosInstance.get(url, config);
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig | undefined,
  ): Promise<T> {
    return await this.axiosInstance.post(url, data, config);
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig | undefined,
  ): Promise<T> {
    return await this.axiosInstance.put(url, data, config);
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig | undefined,
  ): Promise<T> {
    return await this.axiosInstance.delete(url, config);
  }
}
