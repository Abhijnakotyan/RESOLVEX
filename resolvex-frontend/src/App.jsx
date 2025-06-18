import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import DepartmentPage from "./pages/DepartmentPage";
import Dashboard from "./pages/UserDashboard";
import Complaintform from "./components/ComplaintForm";
import ViewComplaints from "./pages/ViewComplaints";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/department" element={<DepartmentPage/>}/>
        <Route path="/userdashboard" element={<Dashboard/>}/>
        <Route path="/complaintform" element={<Complaintform/>}/>
        <Route path="/viewcomplaints" element={<ViewComplaints/>}/>
      </Routes>
    </Router>
  );
};

export default App;
