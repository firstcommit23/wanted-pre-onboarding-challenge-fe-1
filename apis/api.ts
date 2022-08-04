import authInstance from './authInstance';
import todoInstance from './todoInstance';
import type { User, Todo } from './type';

export const getTodos = () => {
  return todoInstance.get(`/todos`).then((res) => res.data.data || []);
};

export const createTodo = (todo: Todo) => {
  return todoInstance.post('/todos', todo);
};

export const updateTodo = (todo: Todo) => {
  return todoInstance.put(`/todos/${todo.id}`, todo);
};

export const deleteTodo = (todo: Todo) => {
  return todoInstance.delete(`/todos/${todo.id}`);
};

export const login = (params: User) => {
  return authInstance.post(`/users/login`, params);
};

export const signup = (params: User) => {
  return authInstance.post(`/users/create`, params);
};
