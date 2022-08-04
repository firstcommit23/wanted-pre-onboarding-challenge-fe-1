import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '@/apis/api';
import type { User } from '@/apis/type';
import EmailPasswordInputView from '@/components/EmailPasswordInputView';

const Login = () => {
  const [user, setUser] = useState<User>({ email: '', password: '' });
  const router = useRouter();

  useEffect(() => {
    if (!!localStorage.getItem('token')) {
      router.push('/');
    }
  }, []);

  const handleButton = async () => {
    // TODO: 유효성 체크하기
    if (!user.email || !user.password) {
      alert('아이디와 비밀번호를 입력하세요.');
      return;
    }

    const result = await login(user);
    alert(result.data.message);
    if (result.status === 200 && result.statusText === 'OK') {
      const { message, token } = result.data;
      alert(message);
      localStorage.setItem('token', JSON.stringify(token));
      router.push('/');
    } else {
      // TODO: Uncaught (in promise) error 고치기
      console.log(result);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <EmailPasswordInputView
      authType="login"
      user={user}
      handleChange={handleChange}
      handleButton={handleButton}
    />
  );
};

export default Login;
