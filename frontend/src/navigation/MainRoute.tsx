import React, { memo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../screen/home/Home";
import SplashScreen from "../screen/SplashScreen/SplashScreen";
import Auth from "../screen/Auth/Auth";
import FormRoute from "./FormRoute";

const MainRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/form" element={<FormRoute />} />
      </Routes>
    </Router>
  );
};

export default memo(MainRoute);
