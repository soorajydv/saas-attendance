import type React from "react"
import type { IStudent } from "@/types/admin/school"
import "@/styles/admin/forms.css"

interface StudentFormProps {
  studentData: IStudent
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  handleSubmit: (e: React.FormEvent) => void
}

const StudentForm: React.FC<StudentFormProps> = ({ studentData, handleChange, handleSubmit }) => {
  return (
    <div className="form-container">
      <h2>Student Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={studentData.fullName}
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
            value={studentData.email}
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
            value={studentData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" value={studentData.gender} onChange={handleChange} required>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="grade">Grade</label>
          <input
            type="text"
            id="grade"
            name="grade"
            value={studentData.grade}
            onChange={handleChange}
            placeholder="Enter grade"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="section">Section</label>
          <input
            type="text"
            id="section"
            name="section"
            value={studentData.section}
            onChange={handleChange}
            placeholder="Enter section"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="guardianName">Guardian Name</label>
          <input
            type="text"
            id="guardianName"
            name="guardianName"
            value={studentData.guardianName}
            onChange={handleChange}
            placeholder="Enter guardian name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="guardianPhone">Guardian Phone</label>
          <input
            type="tel"
            id="guardianPhone"
            name="guardianPhone"
            value={studentData.guardianPhone}
            onChange={handleChange}
            placeholder="Enter guardian phone"
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
              value={studentData.address.street}
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
              value={studentData.address.city}
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
              value={studentData.address.state}
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
              value={studentData.address.country}
              onChange={handleChange}
              placeholder="Enter country"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="addressZipCode">Zip Code</label>
            <input
              type="text"
              id="addressZipCode"
              name="address.zipCode"
              value={studentData.address.zipCode}
              onChange={handleChange}
              placeholder="Enter zip code"
            />
          </div>
        </div>

        <button type="submit" className="submit-button">
          Save Student Information
        </button>
      </form>
    </div>
  )
}

export default StudentForm

