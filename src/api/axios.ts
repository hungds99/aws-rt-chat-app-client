import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class AxiosServices {
  static axiosInstance: AxiosInstance;

  constructor(
    axiosInstance: AxiosInstance = axios.create({
      baseURL: 'http://localhost:3000/api/',
      timeout: 1000,
      withCredentials: true,
    })
  ) {
    axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      const token: string | null = localStorage.getItem('accessToken');
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    });

    axiosInstance.interceptors.response.use(
      (response) => {
        // Do something with response data
        return response.data;
      },
      async (error) => {
        // Do something with response error
        if (error.response.status === 401) {
          localStorage.removeItem('accessToken');
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            try {
              const response = await axiosInstance.post('auth/refresh', { refreshToken });
              localStorage.setItem('accessToken', response.data.accessToken);
              localStorage.setItem('refreshToken', response.data.refreshToken);
              return await axiosInstance.request(error.config);
            } catch (error) {
              return Promise.reject(error);
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  static async get<T>(url: string, config?: AxiosRequestConfig | undefined): Promise<T> {
    return await AxiosServices.axiosInstance.get(url, config);
  }

  static async post<T>(url: string, data?: any, config?: AxiosRequestConfig | undefined): Promise<T> {
    return await AxiosServices.axiosInstance.post(url, data, config);
  }

  static async put<T>(url: string, data?: any, config?: AxiosRequestConfig | undefined): Promise<T> {
    return await AxiosServices.axiosInstance.put(url, data, config);
  }

  static async delete<T>(url: string, config?: AxiosRequestConfig | undefined): Promise<T> {
    return await AxiosServices.axiosInstance.delete(url, config);
  }
}
