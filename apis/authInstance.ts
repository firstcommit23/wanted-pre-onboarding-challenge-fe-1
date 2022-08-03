import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

const authInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

authInstance.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    config.data = qs.stringify(config.data);
    return Promise.resolve(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

authInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authInstance;
