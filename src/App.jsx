import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// PAGES (lowercase folder name)
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import CreateBlog from "./Pages/CreateBlog";
import BlogDetails from "./Pages/BlogDetails";
import EditBlog from "./Pages/EditBlog";
import DeleteBlog from "./Pages/DeleteBlog";
import Profile from "./Pages/Profile";
import MyBlogs from "./Pages/MyBlogs";


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
