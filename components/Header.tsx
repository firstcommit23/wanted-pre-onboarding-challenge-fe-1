import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Header = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLogin(!!token);
  }, []);

  return (
    <div>
      <div>
        <Link href="/">
          <a>TODO APP</a>
        </Link>
        메인 입니다
      </div>

      {isLogin && (
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            setIsLogin(false);
            router.push('/');
          }}>
          로그아웃
        </a>
      )}

      {!isLogin && (
        <>
          <Link href="/auth/signup">
            <a>회원가입</a>
          </Link>
          <Link href="/auth/login">
            <a>로그인</a>
          </Link>
        </>
      )}
    </div>
  );
};
export default Header;
