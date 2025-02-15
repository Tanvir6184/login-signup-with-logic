import React from "react";

import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";

const MainFile = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
};

export default MainFile;
