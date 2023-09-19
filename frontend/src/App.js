import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Login } from "./container/Login";
import { Register } from "./container/Sign-Up";
import { EmployeeLayout } from "./container/Layout";
import { DepartmentLayout } from "./container/Layout";
import { Status } from "./components/DropDown";
// import Employee from "./components/Layout/layout.main";
// import Department from "./components/Layout/layout.department";
// import Register from "./pages/register";
// import Hearder from "./components/header/header";
// import Main from "./components/Layout/layout.department.js";
// import IssuesCard from "./components/card/issues";
// import TimeLine from "./components/timeline";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TimeLine } from "./components/TimLine";
import { LayoutBar } from "./components/layout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />{" "}
        <Route path="/employee" element={<EmployeeLayout />} />
        <Route path="/department" element={<DepartmentLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
