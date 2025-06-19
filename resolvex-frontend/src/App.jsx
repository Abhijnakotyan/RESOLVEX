import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/User/LoginPage";
import RegistrationPage from "./pages/User/RegistrationPage";
import Dashboard from "./pages/User/UserDashboard";
import Complaintform from "./components/ComplaintForm";
import ViewComplaints from "./pages/User/ViewComplaints";
import UserProfile from "./pages/User/UserProfile";
import LandingPage from "./pages/LandingPage";
import DepartmentLogin from "./pages/Department/DepartmentLogin";
import DepartmentDashboard from "./pages/Department/DepartmentDashboard";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/userdashboard" element={<Dashboard/>}/>
        <Route path="/complaintform" element={<Complaintform/>}/>
        <Route path="/viewcomplaints" element={<ViewComplaints/>}/>
        <Route path="/profile" element={<UserProfile/>}/>
        <Route path="/departmentlogin" element={<DepartmentLogin/>}/>
        <Route path="/department/:departmentName" element={<DepartmentDashboard />} />
        </Routes>
    </Router>
  );
};

export default App;
