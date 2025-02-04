import React, { memo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "../screen/Form/Form";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
    </Routes>
  );
};

export default memo(MainRoute);
