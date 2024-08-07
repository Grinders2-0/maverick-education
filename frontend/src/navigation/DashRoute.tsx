import React, { memo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "../screen/Form/Form";
import Home from "../screen/home/Home";

const DashRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default memo(DashRoute);
