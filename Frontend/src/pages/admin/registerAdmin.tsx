import React, { useState } from "react";
import api from "../../api/api";
import "../../styles/auth/signup.css";
import { BACKEND_URL } from "../../api/api";
import RegistrationForm from "./signup/registrationForm";

// ✅ Fixed: Aligned fields with `registrationForm.tsx`
export interface AdminFormData {
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

const RegisterAdmin: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleSignup = async (formData: AdminFormData) => {
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await api.post(`${BACKEND_URL}/auth/signup`, {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        dateOfBirth: formData.dateOfBirth,
        phoneNumber: formData.phoneNumber,
        gender: formData.gender,
        role: formData.role,
        organizationId: formData.organizationId,
      });

      if (response.data.success) {
        setSuccess("Admin registered! Please log in.");
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <h2>Hi!</h2>
          <p>Please Register here</p>
        </div>
        <RegistrationForm onSubmit={handleSignup} error={error} success={success} />
      </div>
    </div>
  );
};

export default RegisterAdmin;
