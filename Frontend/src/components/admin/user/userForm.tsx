import React, { useState } from "react";
import UserFormHtml from "./userFormHtml";

export interface UserFormData {
  fullName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: "MALE" | "FEMALE";
  role: "STUDENT" | "TEACHER";
}

const UserForm: React.FC<{
  userData: UserFormData;
  setUserData: React.Dispatch<React.SetStateAction<UserFormData>>;
  onSubmit: (userData: UserFormData) => void;
}> = ({ onSubmit }) => {
  const [userData, setUserData] = useState<UserFormData>({
    fullName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    phoneNumber: "",
    gender: "MALE",
    role: "STUDENT",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(userData);
  };

  return (
    <UserFormHtml
      userData={userData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default UserForm;
