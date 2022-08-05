import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signup } from '@/apis/api';
import type { User } from '@/apis/type';
import EmailPasswordInputView from '@/components/EmailPasswordInputView';

const SignUp = () => {
  const [user, setUser] = useState<User>({ email: '', password: '' });
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/');
    }
  }, []);

  const handleButton = async () => {
    try {
      const result = await signup(user);
      if (result.status === 200) {
        alert(result.data.message);
        router.push('/auth/login');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.details;
      errorMessage && alert(errorMessage);
    }
    // TODO: Uncaught (in promise) error 고치기
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <EmailPasswordInputView
      authType="signup"
      user={user}
      handleChange={handleChange}
      handleButton={handleButton}
    />
  );
};

export default SignUp;
