import authInstance from './authInstance';
import todoInstance from './todoInstance';
import type { User } from './type';
export const getTodos = () => {
  return todoInstance.get(`/todos`).then((res) => res.data.data || []);
};

export const login = (params: User) => {
  return authInstance.post(`/users/login`, params);
};

export const signup = (params: User) => {
  return authInstance.post(`/users/create`, params);
};
