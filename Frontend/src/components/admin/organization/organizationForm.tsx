import React, { ChangeEvent, FormEvent, useState } from "react";
import "@/styles/admin/suDashboard.css";
import "@/styles/admin/forms.css";
import api, { BACKEND_URL } from "@/api/api";
import { useNavigate } from "react-router-dom";
import {
  IOrganization,
  OrganizationStatus,
  SubscriptionPlan,
} from "@/types/admin/organization";

interface OrganizationFormProps {
  onSubmit: (organizationData: IOrganization) => void;
  error: string;
  success: string;
}

const OrganizationForm: React.FC<OrganizationFormProps> = ({
  onSubmit,
  error,
  success,
}) => {
  const [organizationData, setOrganizationData] = useState<IOrganization>({
    _id: "", // Default empty string, assuming it’s assigned by backend
    name: "",
    email: "",
    phone: "",
    logoUrl: undefined, // Optional field
    organizationType: "",
    address: {
      city: "",
      street: undefined,
      district: undefined,
      state: "",
      country: "",
      zipCode: undefined,
    },
    subscriptionPlan: SubscriptionPlan.FREE, // Default value from enum
    status: OrganizationStatus.PENDING, // Default value from enum
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setOrganizationData((prev: any) => {
      if (name.startsWith("address.")) {
        const addressKey = name.split(".")[1];
        return {
          ...prev,
          address: { ...prev.address, [addressKey]: value || "" },
        };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    onSubmit(organizationData);
    try {
      console.log("Backend URL:", BACKEND_URL);
      const response = await api.post(
        `${BACKEND_URL}/su/organizations`,
        organizationData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        success = "Organization created successfully";
      } else {
        error = `${response.data.message}`;
      }
    } catch (err: any) {
      console.error("Error occurred during API call:", err);
      alert(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={organizationData.phone}
            onChange={handleChange}
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address.city">City</label>
          <input
            type="text"
            id="address.city"
            name="address.city"
            value={organizationData?.address?.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address.street">Street</label>
          <input
            type="text"
            id="address.street"
            name="address.street"
            value={organizationData?.address?.street}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address.district">District</label>
          <input
            type="text"
            id="address.district"
            name="address.district"
            value={organizationData?.address?.district}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address.state">State</label>
          <input
            type="text"
            id="address.state"
            name="address.state"
            value={organizationData?.address?.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address.country">Country</label>
          <input
            type="text"
            id="address.country"
            name="address.country"
            value={organizationData?.address?.country}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address.zipCode">Zip Code</label>
          <input
            type="text"
            id="address.zipCode"
            name="address.zipCode"
            value={organizationData?.address?.zipCode}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Organization</button>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </form>
    </div>
  );
};

export default OrganizationForm;
