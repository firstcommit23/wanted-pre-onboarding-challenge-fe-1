export type User = {
  email: string;
  password: string;
};

export type Todo = {
  title: string;
  content: string;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
};
