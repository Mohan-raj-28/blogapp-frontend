import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const DeleteBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const deleteBlog = async () => {
    await API.delete(`/blog/${id}`);
    alert("Blog deleted successfully!");
    navigate("/home");
  };

  return (
    <div className="container text-center mt-5">
      <h2 className="fw-bold">Delete Blog?</h2>
      <p className="text-muted">This action cannot be undone.</p>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="btn btn-danger px-4" onClick={deleteBlog}>
          Yes, Delete
        </button>

        <button
          className="btn btn-secondary px-4"
          onClick={() => navigate("/home")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteBlog;
