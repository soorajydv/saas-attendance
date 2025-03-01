import React from "react";
import '@/styles/admin/suDashboard.css'

const OrganizationFormHtml: React.FC<{
  organizationData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  error: string;
  success: string;
}> = ({ organizationData, handleChange, handleSubmit }) => {
  return (
    <div className="form-container">
      <h2>Create Organization</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={organizationData.name}
            onChange={handleChange}
            placeholder="Enter organization name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={organizationData.email}
            onChange={handleChange}
            placeholder="Enter organization email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={organizationData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="logoUrl">Logo URL</label>
          <input
            type="text"
            id="logoUrl"
            name="logoUrl"
            value={organizationData.logoUrl}
            onChange={handleChange}
            placeholder="Enter logo URL (optional)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="organizationType">Organization Type</label>
          <input
            type="text"
            id="organizationType"
            name="organizationType"
            value={organizationData.organizationType}
            onChange={handleChange}
            placeholder="Enter organization type"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="addressCity">City</label>
          <input
            type="text"
            id="addressCity"
            name="address.city"
            placeholder="City"
            value={organizationData.address.city}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="addressState">State</label>
          <input
            type="text"
            id="addressState"
            name="address.state"
            placeholder="State"
            value={organizationData.address.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="addressCountry">Country</label>
          <input
            type="text"
            id="addressCountry"
            name="address.country"
            placeholder="Country"
            value={organizationData.address.country}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Organization</button>
      </form>
    </div>
  );
};

export default OrganizationFormHtml;
