import React, { useState } from "react";
import RegistrationFormHtml from "./registrationFormHtml";
import { AdminFormData } from "../registerAdmin";

interface RegistrationFormProps {
  onSubmit: (formData: AdminFormData) => Promise<void>;
  error: string;
  success: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit, error, success }) => {
  const [formData, setFormData] = useState<AdminFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    phoneNumber: "",
    gender: "MALE",
    role: "ADMIN",
    organizationId: "",
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
