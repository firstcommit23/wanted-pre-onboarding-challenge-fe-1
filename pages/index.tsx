import { useEffect } from 'react';
import { getTodos } from '@/apis/api';

const Home = () => {
  useEffect(() => {
    const result = getTodos();
    console.log(result);
  }, []);

  return <div>여기에 투두 목록을 보이게 할 것 입니다.</div>;
};

export default Home;
