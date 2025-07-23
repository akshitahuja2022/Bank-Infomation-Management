import React from "react";
import Navbar from "./Component/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Account from "./Pages/Account";
import Dashboard from "./Component/Dashboard";
import EditAccount from "./Component/EditAccount";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit/:id" element={<EditAccount />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
