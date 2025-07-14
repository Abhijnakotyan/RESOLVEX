import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/User/UserDashboard";
import Complaintform from "./Component/ComplaintForm";
import ViewComplaints from "./Pages/User/ViewComplaints";
import LandingPage from "./Pages/LandingPage";
import AuthCard from "./Pages/User/AuthCard";
import TrackComplaintPage from './pages/TrackComplaintPage';
import UserFeedback from "./Pages/User/UserFeedback";
import ViewFeedback from "./Pages/User/ViewFeedback";

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
        <Route path="/viewFeedback" element={<ViewFeedback/>}/>
        <Route path="/track-complaint" element={<TrackComplaintPage />} />
        </Routes>
    </Router>
  );
};

export default App;
