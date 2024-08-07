import React, { memo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../screen/home/Home";
import SplashScreen from "../screen/SplashScreen/SplashScreen";
import Auth from "../screen/Auth/Auth";
import FormRoute from "./FormRoute";
import DashRoute from "./DashRoute";

const MainRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/form" element={<FormRoute />} />
        <Route path="/dashboard" element={<DashRoute />} />
      </Routes>
    </Router>
  );
};

export default memo(MainRoute);
