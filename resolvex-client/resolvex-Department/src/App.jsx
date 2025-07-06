import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DepartmentLogin from "./pages/Department/DepartmentLogin";
import DepartmentDashboard from "./Pages/Department/DepartmentDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/departmentlogin" element={<DepartmentLogin/>}/>
        <Route path="/department/:departmentName" element={<DepartmentDashboard />} />
        </Routes>
    </Router>
  );
};

export default App;
