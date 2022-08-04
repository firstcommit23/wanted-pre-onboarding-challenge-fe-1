import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signup } from '@/apis/api';
import type { User } from '@/apis/type';
import EmailPasswordInputView from '@/components/EmailPasswordInputView';

const SignUp = () => {
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

    const result = await signup(user);
    if (result.status === 200) {
      alert(result.data.message);
      router.push('/auth/login');
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
