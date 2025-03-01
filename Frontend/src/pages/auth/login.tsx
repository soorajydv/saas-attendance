import React, { useState } from "react";
import api from "../../api/api";
import LoginForm from "../../components/auth/login/loginForm";
import "../../styles/auth/login.css";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../api/api";

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (loginData: LoginData) => {
    setError("");
    try {
      const response: any = await api.post(
        `${BACKEND_URL}/auth/login`,
        {
          email: loginData.email,
          password: loginData.password,
        },
        { withCredentials: true }
      );
  
      console.log("Token in Response:", response.data.token);
      console.log("Role in Response:", response.data.role);
  
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token); // Store token
        localStorage.setItem("role", response.data.role); // Store role
        console.log("Login success & Token and role stored in localStorage");
  
        const userRole = response.data.role;
        if (userRole === "SU") {
          navigate("/su-dashboard");
        } else if (userRole === "ADMIN") {
          navigate("/admin");
        } else if (userRole === "USER") {
          navigate("/user");
        } else {
          navigate("/");
        }
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          {/* <img src="/assets/login-icon.png" alt="Login Icon" className="login-icon" /> */}
          <h2>Welcome Back!</h2>
          <p>Please log in to your account</p>
        </div>
        <LoginForm onLogin={handleLogin} error={error} />
      </div>
    </div>
  );
};

export default Login;
