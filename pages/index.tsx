import { useEffect, useState } from 'react';
import type { Todo } from '@/apis/type';
import { getTodos } from '@/apis/api';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoDetail from '@/components/TodoDetail';

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLogin(!!token);
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const result = await getTodos();
    setTodos(result);
  };

  return (
    <>
      {!isLogin && <div className="text-xl px-3">로그인 후 사용이 가능합니다 ✨</div>}

      {isLogin && (
        <>
          <TodoInput todos={todos} setTodos={setTodos} />
          <TodoList todos={todos} />
          <TodoDetail todos={todos} setTodos={setTodos} />
        </>
      )}
    </>
  );
};

export default Home;
