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
    setIsLogin(!!localStorage.getItem('token'));
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const result = await getTodos();
    setTodos(result);
  };

  return (
    <div>
      {!isLogin && <>로그인 후 사용이 가능합니다 ✨</>}

      {isLogin && (
        <>
          <hr />
          <TodoInput todos={todos} setTodos={setTodos} />
          <hr />
          <TodoList todos={todos} />
          <hr />
          <TodoDetail todos={todos} setTodos={setTodos} />
        </>
      )}
    </div>
  );
};

export default Home;
