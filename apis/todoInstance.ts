import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

const todoInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

todoInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: token ? `Bearer ${token}` : '',
    };
    config.data = qs.stringify(config.data);
    return Promise.resolve(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default todoInstance;
