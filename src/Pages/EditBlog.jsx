import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: "",
    selectedFile: ""
  });

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const fetchBlog = async () => {
    const res = await API.get(`/blog/${id}`);
    const blog = res.data.blogPost;

    setData({
      title: blog.title,
      description: blog.description,
      selectedFile: blog.selectedFile
    });
    setTags(blog.tags || []);
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  const updateBlog = async () => {
    const payload = { ...data, tags };
    await API.post(`/blog/${id}`, payload);
    alert("Blog updated!");
    navigate(`/blog/${id}`);
  };

  const deleteTag = (t) => setTags(tags.filter((x) => x !== t));

  return (
    <div className="container mt-5 mb-5">
      <div className="card p-4 shadow">
        <h2 className="fw-bold mb-4">Edit Blog</h2>

        <label className="form-label fw-semibold">Title</label>
        <input
          className="form-control mb-3"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />

        <label className="form-label fw-semibold">Description</label>
        <textarea
          rows="6"
          className="form-control mb-3"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />

        {/* Tags */}
        <label className="form-label fw-semibold">Tags</label>
        <div className="d-flex gap-2 mb-2">
          <input
            className="form-control"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
          <button
            className="btn btn-dark"
            onClick={() => {
              if (tagInput) {
                setTags([...tags, tagInput]);
                setTagInput("");
              }
            }}
          >
            Add
          </button>
        </div>

        <div className="d-flex flex-wrap gap-2 mb-3">
          {tags.map((t) => (
            <span key={t} className="badge bg-primary p-2">
              {t}
              <button
                className="btn btn-sm btn-light ms-2 py-0"
                onClick={() => deleteTag(t)}
              >
                ✖
              </button>
            </span>
          ))}
        </div>

        {/* Image Preview */}
        {data.selectedFile && (
          <img
            src={data.selectedFile}
            className="img-fluid rounded mb-3"
            alt="preview"
            style={{ maxHeight: "250px", objectFit: "cover" }}
          />
        )}

        <button className="btn btn-success btn-lg w-100" onClick={updateBlog}>
          Update Blog
        </button>
      </div>
    </div>
  );
};

export default EditBlog;
