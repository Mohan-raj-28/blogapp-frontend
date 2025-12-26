import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import EditBlog from "./pages/EditBlog";
import DeleteBlog from "./pages/DeleteBlog";
import Profile from "./pages/Profile";
import MyBlogs from "./pages/MyBlogs";

const App = () => {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/create" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
      <Route path="/blog/:id" element={<ProtectedRoute><BlogDetails /></ProtectedRoute>} />
      <Route path="/edit/:id" element={<ProtectedRoute><EditBlog /></ProtectedRoute>} />
      <Route path="/delete/:id" element={<ProtectedRoute><DeleteBlog /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/myblogs" element={<ProtectedRoute><MyBlogs /></ProtectedRoute>} />

      <Route path="*" element={<h2>404 Not Found</h2>} />
    </Routes>
  );
};

export default App;
