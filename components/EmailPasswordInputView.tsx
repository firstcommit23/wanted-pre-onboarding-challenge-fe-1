import { useEffect, useState } from 'react';
import type { User } from '@/apis/type';

interface IEmailPasswordInputView {
  authType: 'login' | 'signup';
  user: User;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleButton: () => void;
}

const ENABLED_BUTTON_CLASS =
  'block p-2.5 w-full text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2';
const DISABLED_BUTTON_CLASS =
  'block p-2.5 w-full text-white bg-gray-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2';
const EmailPasswordInputView = ({
  authType,
  user,
  handleChange,
  handleButton,
}: IEmailPasswordInputView) => {
  const [isEnabledSubmitButton, setIsEnabledSubmitButton] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [submitButtonClassName, setSubmitButtonClassName] = useState<string>('');

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
    <div className="px-3">
      <h1 className="block w-full text-2xl my-3">✨ {typeKorStr} 하세요</h1>
      <div>
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="아이디를 입력하세요"
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력하세요"
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      <div>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <button
          onClick={handleButton}
          disabled={!isEnabledSubmitButton}
          className={isEnabledSubmitButton ? ENABLED_BUTTON_CLASS : DISABLED_BUTTON_CLASS}>
          {typeKorStr}
        </button>
      </div>
    </div>
  );
};

export default EmailPasswordInputView;
