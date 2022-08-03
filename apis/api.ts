import todoInstance from './todoInstance';

export const getTodos = () => {
  return todoInstance.get(`/todos`).then((res) => res.data.data || []);
};
