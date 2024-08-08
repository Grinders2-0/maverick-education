// MainRoute.tsx
import React, { memo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../screen/home/Home";
import SplashScreen from "../screen/SplashScreen/SplashScreen";
import Auth from "../screen/Auth/Auth";
import FormRoute from "./FormRoute";
import DashRoute from "./DashRoute";
import Subject from "../screen/subject/Subject";
import Course from "../screen/Course/Course";
import SubjectCourse from "../screen/home/SubjectCourse/SubjectCourse";
import Chatbot from "../screen/Chatbot/Chatbot";

const MainRoute: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/form" element={<FormRoute />} />
        <Route path="/home" element={<Home />}>
          <Route path="dashboard" element={<DashRoute />} />
          <Route path="subject" element={<Subject />} />
          <Route path="course" element={<Course />} />
          <Route path="subjectCourse" element={<SubjectCourse />} />
          <Route path="chatbot" element={<Chatbot />} />

          {/* Add more routes here if needed */}
        </Route>
      </Routes>
    </Router>
  );
};

export default memo(MainRoute);
