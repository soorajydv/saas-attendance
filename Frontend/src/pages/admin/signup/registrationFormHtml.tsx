import React from 'react';
import '@/styles/auth/signup.css'
interface RegistrationFormHtmlProps {
  formData: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: string;
    phoneNumber: string;
    gender: "MALE" | "FEMALE" | "OTHERS";
    role: "ADMIN";
    organizationId: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  error: string;
  success: string;
}

const RegistrationFormHtml: React.FC<RegistrationFormHtmlProps> = ({
  formData,
  handleChange,
  handleSubmit,
  error,
  success,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
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
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="gender">Gender</label>
        <select id="gender" name="gender" required>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHERS">Others</option>
        </select>
      </div>



      {/* <div className="form-group">
        <label htmlFor="role">Role</label>
        <select id="role" name="role" value={formData.role} onChange={handleChange} required>
          <option value="STUDENT">Student</option>
          <option value="TEACHER">Teacher</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div> */}

      <div className="form-group">
        <label htmlFor="organizationId">Organization ID</label>
        <input
          type="text"
          id="organizationId"
          name="organizationId"
          value={formData.organizationId}
          onChange={handleChange}
          required
        />
      </div>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default RegistrationFormHtml;
