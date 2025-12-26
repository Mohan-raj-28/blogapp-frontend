import React from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import "../styles/blogcard.css";

const BlogCard = ({ blog, onDelete, onTagClick }) => {

  // ---- DELETE BLOG ----
  const handleDelete = async () => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      await API.delete(`/blog/${blog._id}`);
      onDelete(blog._id); 
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog");
    }
  };

  return (
    <div className="col-md-4">
      <div className="card shadow-sm border-0 mb-4 blog-card p-3">

        {/* TITLE */}
        <h5 className="card-title fw-bold">{blog.title}</h5>

        {/* DESCRIPTION */}
        <p className="card-text text-muted">
          {blog.description.slice(0, 120)}...
        </p>

        {/* TAGS */}
        <div className="d-flex flex-wrap gap-2 mb-3">
          {blog.tags?.map((tag, index) => (
            <span
              key={index}
              className="badge bg-secondary"
              style={{ cursor: "pointer" }}
              onClick={() => onTagClick(tag)}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="d-flex justify-content-between mt-3">
          <Link to={`/blog/${blog._id}`} className="btn btn-primary btn-sm">
            View
          </Link>

          <Link to={`/edit/${blog._id}`} className="btn btn-warning btn-sm">
            Edit
          </Link>

          <button
            className="btn btn-outline-danger btn-sm"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
};

export default BlogCard;
