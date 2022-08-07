import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import type { Todo } from '@/apis/type';
import { useRouter } from 'next/router';
import { deleteTodo, updateTodo } from '@/apis/api';

const ENABLED_BUTTON_CLASS =
  'p-2.5 text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200  font-medium rounded-lg text-sm px-3 py-1.5 text-center mr-2 my-2';
const DISABLED_BUTTON_CLASS =
  'p-2.5 text-white bg-gray-300 focus:outline-none font-medium rounded-lg text-sm px-3 py-1.5 text-center mr-2 my-2';
const TodoDetail = ({
  todos,
  setTodos,
}: {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>();
  const [editTodo, setEditTodo] = useState<Todo>();
  const router = useRouter();
  const activeId = router.query.id;
  const todo = todos.filter((todo) => todo.id === activeId)[0] || {};

  useEffect(() => {
    setIsEditMode(false);
  }, [activeId]);

  if (JSON.stringify(todo) === '{}') {
    return null;
  }

  const titleEdit = (
    <input
      type="text"
      name="title"
      value={editTodo?.title}
      onChange={(e) =>
        setEditTodo((prev) => {
          return { content: prev?.content || '', title: e.target.value };
        })
      }
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    />
  );
  const titleText = todo.title;
  const title = isEditMode ? titleEdit : titleText;

  const contentEdit = (
    <textarea
      name="content"
      value={editTodo?.content}
      onChange={(e) =>
        setEditTodo((prev) => {
          return { title: prev?.title || '', content: e.target.value };
        })
      }
      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
    />
  );
  const contentText = todo.content;
  const content = isEditMode ? contentEdit : contentText;

  const handleEditModeCancle = () => {
    setIsEditMode(false);
  };

  const handleEditMode = () => {
    setEditTodo({ title: todo.title, content: todo.content });
    setIsEditMode(true);
  };

  const handleDeleteButton = async () => {
    const result = await deleteTodo(todo);
    if (result.status === 200) {
      alert('삭제되었습니다.');
      setTodos(todos.filter((item: Todo) => todo.id !== item.id));
      router.push('/');
    }
  };

  const handleUpdate = async () => {
    if (!editTodo) return;
    if (!editTodo.title || !editTodo.content) {
      alert('필수필수');
      return;
    }

    const result = await updateTodo({ ...todo, title: editTodo.title, content: editTodo.content });
    if (!result.status) {
      alert('오류가 발생 했습니다.');
      return;
    }

    const newTodos = todos.map((item: Todo) =>
      item.id === todo.id
        ? { ...item, title: editTodo?.title || '', content: editTodo?.content || '' }
        : item
    );

    setTodos(newTodos);
    setIsEditMode(false);
  };

  return (
    <div className="pt-12 px-3">
      <h1 className="block w-full text-2xl">상세 내용은 아래에서 확인하세요 👇</h1>
      <div className="text-sm">
        <div className="font-bold text-2xl pt-4">{title}</div>
        <div className="text-lg whitespace-pre-wrap py-4">{content}</div>
        <div>글번호 : {todo.id}</div>
        <div>생성일자 : {todo.createdAt}</div>
        <div>수정일자 : {todo.updatedAt}</div>
      </div>

      <div>
        <button
          disabled={!isEditMode}
          onClick={handleUpdate}
          className={isEditMode ? ENABLED_BUTTON_CLASS : DISABLED_BUTTON_CLASS}>
          저장
        </button>
        <button
          disabled={!isEditMode}
          onClick={handleEditModeCancle}
          className={isEditMode ? ENABLED_BUTTON_CLASS : DISABLED_BUTTON_CLASS}>
          취소
        </button>
        <button
          disabled={isEditMode}
          onClick={handleEditMode}
          className={!isEditMode ? ENABLED_BUTTON_CLASS : DISABLED_BUTTON_CLASS}>
          수정
        </button>
        <button
          onClick={handleDeleteButton}
          disabled={isEditMode}
          className={!isEditMode ? ENABLED_BUTTON_CLASS : DISABLED_BUTTON_CLASS}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default TodoDetail;
