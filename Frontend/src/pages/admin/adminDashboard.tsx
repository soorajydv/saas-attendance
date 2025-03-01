import React, { useEffect, useRef, useState } from "react";
import { Star, LayoutDashboard, GraduationCap, Users, Calendar, Bus, Menu, Search, Mail, Bell, User } from "lucide-react";
import { DashboardContent } from "@/components/admin/dashboard";
import { ManageTeachers } from "@/components/admin/teachers";
import { ManageBuses } from "@/components/admin/buses";
import '../../styles/admin/suDashboard.css'
const AdminDashboard: React.FC = () => {
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());
  const [selectedOption, setSelectedOption] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar toggle

  const sidebarRef = useRef<HTMLDivElement>(null); // Ref for the sidebar

  // Update date and time every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Function to handle sidebar item click
  const handleNavClick = (option: string) => {
    setSelectedOption(option);
  };

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(true); // Close sidebar
      }
    };

    document.addEventListener("click", handleClickOutside); // Add event listener
    return () => {
      document.removeEventListener("click", handleClickOutside); // Cleanup event listener
    };
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="navbar">
        {/* Sidebar Title - Left */}
        <div className="left">
          <Menu className="hamburger" onClick={toggleSidebar} />
          {/* Hamburger menu */}
          <h1 className="sidebar-title ml-[1rem]" style={{ color: "black", textShadow: "0px 0px 2px black" }}>
            <Star className="sidebar-icon" style={{ fontSize: "48px", fontWeight: "bold", color: "rgb(255, 166, 0)" }} />
            Admin Dashboard
          </h1>
        </div>

        {/* Search Box - Center */}
        <div className="center">
          <div className="search-box-container">
            <Search className="search-icon" />
            <input
              type="search"
              placeholder="Search..."
              className="search-box"
            />
          </div>
        </div>

        {/* Icons (DateTime, Mail, Bell, User) - Right */}
        <div className="right">
          <p>{dateTime}</p>
          <Mail className="icon" />
          <Bell className="icon" />
          <User className="icon" />
        </div>
      </div>
      {/* Main content area */}
      <div className="main-content">
        {selectedOption === "dashboard" && DashboardContent()}
        {selectedOption === "teachers" && ManageTeachers()}
        {selectedOption === "students" && DashboardContent()}
        {selectedOption === "classes" && DashboardContent()}
        {selectedOption === "buses" && ManageBuses()}
      </div>
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
        <ul>
          <li onClick={() => handleNavClick("dashboard")}>
            <LayoutDashboard className="icon" /> Dashboard
          </li>
          <li onClick={() => handleNavClick("teachers")}>
            <GraduationCap className="icon" /> Teachers
          </li>
          <li onClick={() => handleNavClick("students")}>
            <Users className="icon" /> Students
          </li>
          <li onClick={() => handleNavClick("classes")}>
            <Calendar className="icon" /> Classes
          </li>
          <li onClick={() => handleNavClick("buses")}>
            <Bus className="icon" /> Buses
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
