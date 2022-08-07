import { useRouter } from 'next/router';
import type { Todo } from '@/apis/type';

const TodoList = ({ todos }: { todos: Todo[] }) => {
  const router = useRouter();

  return (
    <div className="px-3 pt-5">
      <h1 className="block w-full text-2xl my-3">등록한 할일 목록이예요 💪</h1>
      {todos.map((item: Todo) => {
        const isActive = item.id === router.query.id;
        return (
          <li
            key={item.id}
            onClick={() => router.push(`/?id=${item.id}`, undefined, { shallow: true })}
            className="leading-7 text-lg cursor-pointer"
            style={{ color: `${isActive ? 'red' : 'black'}` }}>
            {item.title}
          </li>
        );
      })}
      {todos.length <= 0 && <div>할일을 입력해주세요 ✨</div>}
    </div>
  );
};

export default TodoList;
