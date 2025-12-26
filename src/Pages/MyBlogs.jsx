import React, { useEffect, useState } from "react";
import API from "../api/axios";
import getUserId from "../utils/getUserId";
import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchMyBlogs = async () => {
    const userId = getUserId();
    const res = await API.get(`/blog?author=${userId}`);
    setBlogs(res.data.blogs);
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="fw-bold mb-4">My Blogs</h2>

        <div className="row">
          {blogs.length === 0 ? (
            <p>You have not created any blogs yet.</p>
          ) : (
            blogs.map((b) => <BlogCard key={b._id} blog={b} />)
          )}
        </div>
      </div>
    </>
  );
};

export default MyBlogs;
