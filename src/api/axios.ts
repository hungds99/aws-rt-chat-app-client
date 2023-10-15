import axios, { InternalAxiosRequestConfig } from 'axios';
import { HTTPCode } from '../shared/common/enum';
import { Response } from '../shared/interface/common';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
});

axiosClient.interceptors.request.use(
  (_config: InternalAxiosRequestConfig<any>) => {
    const token: string | null = localStorage.getItem('accessToken');

    if (token) {
      _config.headers['Content-Type'] = 'application/json';
      _config.headers.Authorization = `Bearer ${token}`;
    }
    return _config;
  }
);

axiosClient.interceptors.response.use(
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
      localStorage.removeItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axiosClient.post('auth/refresh', {
            refreshToken
          });
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          return await axiosClient.request(error.config);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
