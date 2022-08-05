import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import type { Todo } from '@/apis/type';
import { useRouter } from 'next/router';
import { deleteTodo, updateTodo } from '@/apis/api';

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
    />
  );
  const titleText = todo.title;
  const title = isEditMode ? titleEdit : titleText;

  const contentEdit = (
    <input
      type="text"
      name="content"
      value={editTodo?.content}
      onChange={(e) =>
        setEditTodo((prev) => {
          return { title: prev?.title || '', content: e.target.value };
        })
      }
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
    <>
      <h1>투두 상세입니다.</h1>
      <button disabled={!isEditMode} onClick={handleUpdate}>
        저장
      </button>
      <button disabled={!isEditMode} onClick={handleEditModeCancle}>
        취소
      </button>
      <button disabled={isEditMode} onClick={handleEditMode}>
        수정
      </button>
      <button onClick={handleDeleteButton} disabled={isEditMode}>
        삭제
      </button>
      <div>
        <div>아이디 : {todo.id}</div>
        <div>제목 :{title}</div>
        <div>내용 :{content}</div>
        <div>생성일자 : {todo.createdAt}</div>
        <div>수정일자 : {todo.updatedAt}</div>
      </div>
    </>
  );
};

export default TodoDetail;
