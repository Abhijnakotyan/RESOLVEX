import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../../resolvex-Admin/src/Pages/LandingPage";
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AllComplaints from './Pages/Admin/AllComplaints';
import AdminHome from "./Pages/Admin/AdminHome";
import DepartmentComplaintList from './Components/DepartmentComplaintList';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
        <Route path="/admin/home" element={<AdminHome/>}/>
        <Route path="/admin/complaints" element={<AllComplaints />} />
        <Route path="/admin/complaints/:department" element={<DepartmentComplaintList />} />
        </Routes>
    </Router>
  );
};

export default App;
