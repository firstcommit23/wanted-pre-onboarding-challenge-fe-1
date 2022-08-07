import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Header = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLogin(!!token);
  });

  return (
    <div className="border-solid sticky top-0 w-full h-26m overflow-hidden bg-indigo-100">
      <div className="max-w-screen-md m-auto flex items-center justify-between py-6 px-3">
        <div>
          <Link href="/">
            <a className="text-2xl">TODO APP</a>
          </Link>
        </div>

        {isLogin && (
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem('token');
              router.replace('/');
            }}
            className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            로그아웃
          </a>
        )}

        {!isLogin && (
          <div className="flex gap-x-1">
            <Link href="/auth/signup">
              <a className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                회원가입
              </a>
            </Link>
            <Link href="/auth/login">
              <a className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                로그인
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
