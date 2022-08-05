import { useRouter } from 'next/router';
import type { Todo } from '@/apis/type';

const TodoList = ({ todos }: { todos: Todo[] }) => {
  const router = useRouter();

  return (
    <>
      <h1>투두 목록 </h1>
      {todos.map((item: Todo) => {
        const isActive = item.id === router.query.id;
        return (
          <li
            key={item.id}
            onClick={() => router.push(`/?id=${item.id}`, undefined, { shallow: true })}
            style={{ color: `${isActive ? 'red' : 'black'}` }}>
            {item.title}
          </li>
        );
      })}
      {todos.length <= 0 && <div>할일을 입력해주세요 ✨</div>}
    </>
  );
};

export default TodoList;
