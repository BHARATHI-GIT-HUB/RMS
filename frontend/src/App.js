import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Login } from "./container/Login";
import { Register } from "./container/Sign-Up";
import { EmployeeLayout, DepartmentLayout } from "./container/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { IssueForm } from "./components/Form";
import { DepartmentProfile, EmployeeProfile } from "./components/Profile";
import { TimeLine } from "./components/TimLine";
import { IssueCards } from "./components/Card/IssueCards";
import DetailedView from "./components/DetailedView";
import EmployeeStatus from "./components/TimLine/EmployeeStatus";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employee/*" element={<EmployeeLayout />}>
          <Route index element={<IssueForm />} />
          <Route path="profile" element={<EmployeeProfile />} />
          <Route path="status" element={<EmployeeStatus />} />
        </Route>
        <Route path="/department/" element={<DepartmentLayout />}>
          <Route index element={<IssueCards />} />
          <Route path="detailedview/:id" element={<DetailedView />} />
          <Route path="profile" element={<DepartmentProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
