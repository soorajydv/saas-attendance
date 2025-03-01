import type React from "react"
import type { ITeacher } from "@/types/admin/school"
import "@/styles/admin/forms.css"

interface TeacherFormProps {
  teacherData: ITeacher
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  handleSubmit: (e: React.FormEvent) => void
}

const TeacherForm: React.FC<TeacherFormProps> = ({ teacherData, handleChange, handleSubmit }) => {
  return (
    <div className="form-container">
      <h2>Teacher Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={teacherData.fullName}
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
            value={teacherData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={teacherData.dateOfBirth}
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
            value={teacherData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" value={teacherData.gender} onChange={handleChange} required>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="qualification">Qualification</label>
          <input
            type="text"
            id="qualification"
            name="qualification"
            value={teacherData.qualification}
            onChange={handleChange}
            placeholder="Enter qualification"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="joiningDate">Joining Date</label>
          <input
            type="date"
            id="joiningDate"
            name="joiningDate"
            value={teacherData.joiningDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="address-section">
          <h3>Address Information</h3>
          <div className="form-group">
            <label htmlFor="addressStreet">Street</label>
            <input
              type="text"
              id="addressStreet"
              name="address.street"
              value={teacherData.address.street}
              onChange={handleChange}
              placeholder="Enter street"
            />
          </div>

          <div className="form-group">
            <label htmlFor="addressCity">City</label>
            <input
              type="text"
              id="addressCity"
              name="address.city"
              value={teacherData.address.city}
              onChange={handleChange}
              placeholder="Enter city"
            />
          </div>

          <div className="form-group">
            <label htmlFor="addressState">State</label>
            <input
              type="text"
              id="addressState"
              name="address.state"
              value={teacherData.address.state}
              onChange={handleChange}
              placeholder="Enter state"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="addressCountry">Country</label>
            <input
              type="text"
              id="addressCountry"
              name="address.country"
              value={teacherData.address.country}
              onChange={handleChange}
              placeholder="Enter country"
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-button">
          Save Teacher Information
        </button>
      </form>
    </div>
  )
}

export default TeacherForm

