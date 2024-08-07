import React, { memo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "../screen/Form/Form";
import Home from "../screen/home/Home";
import Course from "../screen/Course/Course";
import Subject from "../screen/subject/Subject";
import DashBoard from "../screen/home/dashboard/DashBoard";

const DashRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<DashBoard />} />
      <Route path="/subject" element={<Subject />} />
      <Route path="/course" element={<Course />} />
    </Routes>
  );
};

export default memo(DashRoute);
