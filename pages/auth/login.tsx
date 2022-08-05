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
    } catch (error) {
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
    <EmailPasswordInputView
      authType="login"
      user={user}
      handleChange={handleChange}
      handleButton={handleButton}
    />
  );
};

export default Login;
