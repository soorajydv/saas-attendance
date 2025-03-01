import api, { BACKEND_URL } from "@/api/api";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await api.post(`${BACKEND_URL}/auth/logout`, {}, { withCredentials: true });

        if (response.status === 200) {
          // Clear token from localStorage
          localStorage.removeItem("token");
          localStorage.removeItem("role");

          // Explicitly remove token from Axios headers
          delete api.defaults.headers.common["Authorization"];
        }
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        navigate("/login");
      }
    };

    logout();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Logging out...</h2>
      <div className="spinner"></div>
    </div>
  );
};

export default Logout;
