import { useEffect, useState } from 'react';
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
  const [isEnabledSubmitButton, setIsEnabledSubmitButton] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoad, setIsLoad] = useState<boolean>(false);

  useEffect(() => {
    setIsLoad(true);
  }, []);

  useEffect(() => {
    if (!isLoad) return;
    if (validate()) {
      setIsEnabledSubmitButton(true);
    } else {
      setIsEnabledSubmitButton(false);
    }
  }, [user]);

  const validate = () => {
    if (!user.email) {
      setErrorMessage('이메일은 필수 입력입니다.');
      return false;
    }
    if (!user.password) {
      setErrorMessage('패스워드는 필수 입력입니다.');
      return false;
    }
    /* eslint-disable */
    if (!user.email.match(/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
      setErrorMessage('이메일 형식이 유효하지 않습니다.');
      return false;
    }
    if (user.password.length < 8) {
      setErrorMessage('패스워드는 8자 이상이여야 합니다.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

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
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <button onClick={handleButton} disabled={!isEnabledSubmitButton}>
          {typeKorStr}
        </button>
      </div>
    </div>
  );
};

export default EmailPasswordInputView;
