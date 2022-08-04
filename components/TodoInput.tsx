import { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/router';
import type { Todo } from '@/apis/type';
import { createTodo } from '@/apis/api';

const TodoItem = ({
  todos,
  setTodos,
}: {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}) => {
  const [inputTodo, setInputTodo] = useState<Todo>({ title: '', content: '' });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTodo({
      ...inputTodo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!inputTodo.title || !inputTodo.content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    const result = await createTodo(inputTodo);
    if (result.status === 200) {
      const { title, content, id, createdAt, updatedAt } = result.data.data;
      const newTodo = [...todos];
      newTodo.push({ title, content, id, createdAt, updatedAt });
      setTodos(newTodo);
      setInputTodo({ title: '', content: '' });
      router.push(`/?id=${id}`);
    }
  };

  return (
    <>
      <h1>투두 투두 입력 </h1>
      <div>
        <div>
          <input
            type="text"
            name="title"
            value={inputTodo.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요."
          />
        </div>
        <div>
          <input
            type="text"
            name="content"
            value={inputTodo.content}
            onChange={handleChange}
            placeholder="내용을 입력하세요."
          />
        </div>
        <button onClick={handleSubmit}>작성</button>
      </div>
    </>
  );
};

export default TodoItem;
