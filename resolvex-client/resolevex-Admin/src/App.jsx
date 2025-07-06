import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/User/UserDashboard";
import Complaintform from "./Components/Complaintform"
import ViewComplaints from "./pages/User/ViewComplaints";
import LandingPage from "./pages/LandingPage";
import AuthCard from "./pages/User/AuthCard";
import TrackComplaintPage from './pages/TrackComplaintPage';
import UserFeedback from "./pages/User/UserFeedback";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/authCard" element={<AuthCard/>}/>
        <Route path="/userdashboard" element={<Dashboard/>}/>
        <Route path="/userfeedback" element={<UserFeedback/>}/>
        <Route path="/complaintform" element={<Complaintform/>}/>
        <Route path="/viewcomplaints" element={<ViewComplaints/>}/>
        <Route path="/track-complaint" element={<TrackComplaintPage />} />
        </Routes>
    </Router>
  );
};

export default App;
