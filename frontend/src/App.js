import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Login } from "./container/Login";
import { Register } from "./container/Sign-Up";
import { EmployeeLayout } from "./container/Layout";
import { DepartmentLayout } from "./container/Layout";
import { Status } from "./components/DropDown";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Primary } from "./components/Button/Primary";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employee" element={<EmployeeLayout />} />
        <Route path="/department" element={<DepartmentLayout />} />
        <Route path="/department" element={<DepartmentLayout />} />
        <Route path="/dropDown" element={<Status />} />
        <Route path="/button" element={<Primary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
