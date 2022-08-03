import type { User } from '@/apis/type';

interface IEmailPasswordInputView {
  authType: 'login' | 'signup';
  user: User;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleButton: () => void;
}

const EmailPasswordInputView = ({
  authType,
  user,
  handleChange,
  handleButton,
}: IEmailPasswordInputView) => {
  const typeKorStr = authType === 'login' ? '로그인' : '회원가입';
  return (
    <div>
      <div>{typeKorStr} 하세요</div>
      <div>
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="아이디를 입력하세요"
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력하세요"
        />
      </div>
      <div>
        <button onClick={handleButton}>{typeKorStr}</button>
      </div>
    </div>
  );
};

export default EmailPasswordInputView;
