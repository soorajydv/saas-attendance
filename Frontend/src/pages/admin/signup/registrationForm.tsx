import React, { useState } from 'react';
import RegistrationFormHtml from './registrationFormHtml';

interface RegistrationFormProps {
  onSubmit: (formData: FormData) => Promise<void>; // Update to expect a Promise
  error: string;
  success: string;
}

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: "MALE" | "FEMALE";
  role: "ADMIN";
  organizationId: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit, error, success }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    phoneNumber: '',
    gender: 'MALE',
    role: 'ADMIN',
    organizationId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <RegistrationFormHtml
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      error={error}
      success={success}
    />
  );
};

export default RegistrationForm;
