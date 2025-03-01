import React, { useState } from 'react';
import api from '../../api/api';
import SignupForm from '../../components/auth/signup/signupForm';
import '../../styles/auth/signup.css'
import { BACKEND_URL } from '../../api/api';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
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
        password: formData.password,
      });

      if (response.data.success) {
        setSuccess('Signup successful! Please log in.');
      } else {
        setError(response.data.message || 'Signup failed');
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
    <SignupForm onSignup={handleSignup} error={error} success={success} />
  </div>
</div>
);
};

export default Signup;