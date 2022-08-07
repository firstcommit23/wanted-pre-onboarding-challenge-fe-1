import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '@/apis/api';
import type { User } from '@/apis/type';
import EmailPasswordInputView from '@/components/EmailPasswordInputView';

const Login = () => {
  const [user, setUser] = useState<User>({ email: '', password: '' });
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/');
    }
  }, []);

  const handleButton = async () => {
    try {
      const result = await login(user);
      if (result.status === 200 && result.statusText === 'OK') {
        const { message, token } = result.data;
        alert(message);
        localStorage.setItem('token', JSON.stringify(token));
        router.push('/');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.details;
      errorMessage && alert(errorMessage);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <EmailPasswordInputView
        authType="login"
        user={user}
        handleChange={handleChange}
        handleButton={handleButton}
      />
      <div className="py-6 px-3">
        로그인 없이 사용하실려면 클릭하세요! 👉{' '}
        <span
          className="underline"
          onClick={() => {
            localStorage.setItem('token', 'test');
            router.push('/');
          }}>
          click!
        </span>
      </div>
    </>
  );
};

export default Login;
