import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../../resolvex-Admin/src/Pages/LandingPage";
import AdminLogin from "./Pages/Admin/AdminLogin";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/login" element={<AdminLogin/>}/>
        </Routes>
    </Router>
  );
};

export default App;
