import React, { useState } from 'react';
import SignupFormHtml from '../signup/signupFormHtml';

interface SignupFormProps {
  onSignup: (formData: FormData) => void;
  error: string;
  success: string;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup, error, success }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup(formData);
  };

  return (
    <SignupFormHtml
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      error={error}
      success={success}
    />
  );
};

export default SignupForm;