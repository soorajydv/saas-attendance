import React, { useEffect, useState } from "react";
import {
  Star,
  LayoutDashboard,
  Home,
  Menu,
  Search,
  Mail,
  Bell,
  User,
} from "lucide-react";
import { SuDashboardContent } from "@/components/admin/suDashboard";
import api, { BACKEND_URL } from "@/api/api";
import OrganizationForm from "@/components/admin/organization/organizationForm";
import { IOrganization } from "@/types/admin/organization";
import RegistrationForm from "./signup/registrationForm";
import { IUser } from "@/components/admin/adminsList";

const SuDashboard: React.FC = () => {
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());
  const [selectedOption, setSelectedOption] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [organizationCount, setOrganizationCount] = useState(0);
  const [organizations, setOrganizations] = useState<IOrganization[]>([]);
  const [admins, setAdmins] = useState<IUser[]>([]);
  const [usersCount, setUsersCount] = useState(0);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await api.get(`${BACKEND_URL}/su/users`);
        if (response.status === 200) {
          setUsersCount(response.data.data.length);
          setAdmins(response.data.data);
        } else {
          console.error("Error fetching admins count:", response.data.message);
        }
      } catch (err: any) {
        console.error("Error fetching admins:", err);
      }
    };

    const fetchOrganizations = async () => {
      try {
        const response = await api.get(`${BACKEND_URL}/su/organizations`, { withCredentials: true });
        if (response.status === 200) {
          setOrganizations(response.data.data);
          setOrganizationCount(response.data.data.length);
        }
      } catch (err: any) {
        console.error("Error fetching organizations:", err);
      }
    };
    
    fetchAdmins();
    fetchOrganizations();
  }, []); // Empty dependency array to run only once on mount

  // Update date and time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (option: string) => {
    setSelectedOption(option);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOrganizationSubmit = async (organizationData: IOrganization) => {
    try {
      const response = await api.post(`${BACKEND_URL}/su/organizations`, organizationData); // Pass organizationData
      if (response.status === 201) {
        setSuccess("Organization successfully created!");
        setOrganizations([...organizations, response.data.data]); // Update state with new organization
      }
      setError("");
    } catch (err) {
      setError("Failed to create organization.");
      setSuccess("");
    }
  };

  const handleAdminSubmit = async (adminData: any) => {
    try {
      const response = await api.post(`${BACKEND_URL}/su/admins/register`, adminData);
      if (response.status === 201) {
        setSuccess("Admin successfully created!");
        setAdmins([admins, response.data.data]); // Update state with new admin
        setError("");
      }
    } catch (err: any) {
      if (err.response) {
        const errorMessage = err.response.data?.message || "Validation failed. Please check the fields.";
        setError(errorMessage);
      } else {
        setError("Failed to create admin.");
      }
      setSuccess("");
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="navbar">
        <div className="left">
          <Menu className="hamburger" onClick={toggleSidebar} />
          <h1 className="sidebar-title ml-[1rem]" style={{ color: "black", textShadow: "0px 0px 2px black" }}>
            <Star className="sidebar-icon" style={{ fontSize: "48px", fontWeight: "bold", color: "rgb(255, 166, 0)" }} />
            Super User Dashboard
          </h1>
        </div>
        <div className="center">
          <div className="search-box-container">
            <Search className="search-icon" />
            <input type="search" placeholder="Search..." className="search-box" />
          </div>
        </div>
        <div className="right">
          <p>{dateTime}</p>
          <Mail className="icon" />
          <Bell className="icon" />
          <User className="icon" />
        </div>
      </div>
      <div className="main-content">
        {selectedOption === "dashboard" && (
          <SuDashboardContent
            organizationCount={organizationCount}
            adminsCount={usersCount}
            organizations={organizations}
            admins={admins}
          />
        )}
        {selectedOption === "add-organization" && (
          <OrganizationForm onSubmit={handleOrganizationSubmit} error={error} success={success} />
        )}
        {selectedOption === "add-admin" && (
          <RegistrationForm onSubmit={handleAdminSubmit} error={error} success={success} />
        )}
      </div>
      <div className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
        <ul>
          <li onClick={() => handleNavClick("dashboard")}>
            <LayoutDashboard className="icon" /> Dashboard
          </li>
          <li onClick={() => handleNavClick("add-organization")}>
            <Home className="icon" /> Add Organization
          </li>
          <li onClick={() => handleNavClick("add-admin")}>
            <User className="icon" /> Add Admin
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SuDashboard;