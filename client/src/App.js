import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import CreatePoll from "./components/polls/CreatePoll";
import EditPoll from "./components/polls/EditPoll";
import ProtectedRoute from "./utils/ProtectedRoute";

import VoteSummary from "./pages/VoteSummary"; 

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/poll/create" element={<ProtectedRoute adminOnly={true}><CreatePoll /></ProtectedRoute>} />
        <Route path="/poll/edit/:id" element={<ProtectedRoute adminOnly={true}><EditPoll /></ProtectedRoute>} />
        <Route path="/summary" element={<VoteSummary />} />

      </Routes>
    </>
  );
}

export default App;
