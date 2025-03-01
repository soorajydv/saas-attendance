import React from "react";

interface UserFormHtmlProps {
  userData: {
    fullName: string;
    email: string;
    password: string;
    dateOfBirth: string;
    phoneNumber: string;
    gender: "MALE" | "FEMALE";
    role: "STUDENT" | "TEACHER";
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const UserFormHtml: React.FC<UserFormHtmlProps> = ({
  userData,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div className="form-container">
      <h2>Create Admin</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={userData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={userData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={userData.gender}
            onChange={handleChange}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={userData.role}
            onChange={handleChange}
          >
            <option value="STUDENT">Student</option>
            <option value="TEACHER">Teacher</option>
          </select>
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default UserFormHtml;
