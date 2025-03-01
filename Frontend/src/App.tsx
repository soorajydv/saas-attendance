import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/signup";
import Login from "./pages/auth/login";
import SuDashboard from "./pages/admin/suDashboard";
import AdminDashboard from "./pages/admin/adminDashboard";
import ProtectedRoute from "./middlewares/authorizeRoute";
import Logout from "./pages/auth/logout";
import QRGenerator from "./pages/qr/generateQr";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/qr/generate" element = {<QRGenerator/>} />

        {/* Protecting the SU Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={["SU"]} />}>
          <Route path="/su-dashboard" element={<SuDashboard />} />
        </Route>

        {/* Protecting the Admin Dashboard (if needed) */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
