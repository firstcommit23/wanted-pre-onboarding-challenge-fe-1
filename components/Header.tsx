import Link from 'next/link';

const Header = () => {
  return (
    <div>
      <div>
        <Link href="/">
          <a>TODO APP</a>
        </Link>
        메인 입니다
      </div>
      <Link href="/auth/signup">
        <a>회원가입</a>
      </Link>
      <Link href="/auth/login">
        <a>로그인</a>
      </Link>
    </div>
  );
};
export default Header;
