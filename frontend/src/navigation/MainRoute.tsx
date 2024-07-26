import React, { memo } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../screen/home/Home";

const MainRoute = () => {
  return (
    <Router>
      <Route path="/" Component={Home} />
    </Router>
  );
};

export default memo(MainRoute);
