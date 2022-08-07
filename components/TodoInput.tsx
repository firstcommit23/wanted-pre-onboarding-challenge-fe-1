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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <div className="px-3">
      <h1 className="block w-full text-2xl my-3">할일을 입력하세요 ✍️</h1>
      <div>
        <div>
          <input
            type="text"
            name="title"
            value={inputTodo.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요."
            className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <textarea
            name="content"
            value={inputTodo.content}
            onChange={handleChange}
            placeholder="내용을 입력하세요."
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>
        <button
          onClick={handleSubmit}
          className="block p-2.5 w-full text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2">
          작성
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
