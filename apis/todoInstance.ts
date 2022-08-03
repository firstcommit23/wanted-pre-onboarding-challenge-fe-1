import axios, { AxiosInstance } from 'axios';

const todoInstance: AxiosInstance = axios.create({
  baseURL: '',
});

todoInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    config.headers = {
      ...config.headers,
      Authorization: token ? `Bearer ${token}` : '',
    };
    return Promise.resolve(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default todoInstance;
