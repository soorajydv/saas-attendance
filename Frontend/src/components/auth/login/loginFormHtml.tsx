import React from 'react';

interface LoginFormHtmlProps {
  loginData: {
    email: string;
    password: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  error: string;
}

const LoginFormHtml: React.FC<LoginFormHtmlProps> = ({
  loginData,
  handleChange,
  handleSubmit,
  error,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          required
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginFormHtml;