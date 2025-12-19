import React, { useState } from "react";
import "./pages/Mengisiabsensi/dashboard.css";

import LoginForm from "./pages/LoginPage/LoginPage.jsx";
import RegisterForm from "./pages/RegisterPage/RegisterPage.jsx";
import LupapasswordForm from "./pages/ForgotPasswordPage/LupaPasswordPage.jsx";

import Navbar from "./pages/Mengisiabsensi/Navbar.jsx";
import Dashboard from "./pages/Mengisiabsensi/Dashboard.jsx";
import RekapAbsensi from "./pages/RekapAbsensi/RekapAbsensi.jsx";
// import DataMurid from "./pages/Mengisiabsensi/DataMurid.jsx";

// konstanta view auth
const VIEW_LOGIN = "login";
const VIEW_REGISTER = "register";
const VIEW_FORGOT_PASSWORD = "forgot_password";

function App() {
  const [view, setView] = useState(VIEW_LOGIN);

  // ⬇️ STATE UNTUK PINDAH HALAMAN DASHBOARD
  const [dashboardPage, setDashboardPage] = useState("mengisi");

  const handleLoginSuccess = () => setView("dashboard");
  const handleLogout = () => setView(VIEW_LOGIN);

  return (
    <div className="App">
      {view === "dashboard" ? (
        <div className="dashboard-layout1">
          {/* NAVBAR */}
          <Navbar
            onLogout={handleLogout}
            setDashboardPage={setDashboardPage}
          />

          {/* CONTENT */}
          <div className="dashboard-content1">
            {dashboardPage === "mengisi" && <Dashboard />}
            {dashboardPage === "rekap" && <RekapAbsensi />}
        
          </div>
        </div>
      ) : (
        <div className="auth-container">
          {view === VIEW_LOGIN && (
            <LoginForm
              onLoginSuccess={handleLoginSuccess}
              onSwitchToRegister={() => setView(VIEW_REGISTER)}
              onSwitchToForgotPassword={() =>
                setView(VIEW_FORGOT_PASSWORD)
              }
            />
          )}

          {view === VIEW_REGISTER && (
            <RegisterForm onSwitchToLogin={() => setView(VIEW_LOGIN)} />
          )}

          {view === VIEW_FORGOT_PASSWORD && (
            <LupapasswordForm onSwitchToLogin={() => setView(VIEW_LOGIN)} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
