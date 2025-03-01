import React, { useState } from 'react';
import api from '../../api/api';
import '../../styles/auth/signup.css'
import { BACKEND_URL } from '../../api/api';
import RegistrationForm from './signup/registrationForm';

interface FormData {
  name: string;
  email: string;
  organizationId: string;
  password: string;
  confirmPassword: string;
}

const RegisterAdmin: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleSignup = async (formData: FormData) => {
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response:any = await api.post(`${BACKEND_URL}/auth/signup`, {
        name: formData.name,
        email: formData.email,
        organizationId: formData.organizationId,
        password: formData.password,
      });

      if (response.data.success) {
        setSuccess('Admin registered! Please log in.');
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
  <div className="signup-page">
  <div className="signup-container">
    <div className="signup-header">
      {/* <img src="/assets/signup-icon.png" alt="signup Icon" className="signup-icon" /> */}
      <h2>Hi!</h2>
      <p>Please Register here</p>
    </div>
    <RegistrationForm
  onSubmit={async (formData) => await handleSignup(formData as any)} 
  error={error}
  success={success}
/>


  </div>
</div>
);
};

export default RegisterAdmin;