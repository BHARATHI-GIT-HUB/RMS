import logo from "./logo.svg";
import "./App.css";

import { Login } from "./container/Login";
import { Register } from "./container/Sign-Up";
import Nav from "./components/NavBar";
import Employee from "./container/Employee";
// import Employee from "./components/Layout/layout.main";
// import Department from "./components/Layout/layout.department";
// import Register from "./pages/register";
// import Hearder from "./components/header/header";
// import Main from "./components/Layout/layout.department.js";
// import IssuesCard from "./components/card/issues";
// import TimeLine from "./components/timeline";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employee" element={<Nav />}>
          <Employee />
        </Route>
        {/* <Route path="/employee" element={<Employee />} /> */}

        {/* <Route path="/employee" element={<Employee />} />
        <Route path="/department" element={<Department />} />
        <Route path="/timeline" element={<TimeLine />} />
      <Route path="/details" element={<Details />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
