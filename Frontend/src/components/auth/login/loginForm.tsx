import React, { useState } from 'react';
import LoginFormHtml from '../login/loginFormHtml';

interface LoginFormProps {
  onLogin: (loginData: LoginData) => void;
  error: string;
}

interface LoginData {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, error }) => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(loginData);
  };

  return (
    <LoginFormHtml
      loginData={loginData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
};

export default LoginForm;
