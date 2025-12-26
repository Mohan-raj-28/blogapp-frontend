import React, { useState } from "react";
import API from "../api/axios";
import getUserId from "../utils/getUserId";

const BlogModal = ({ show, onClose, onSuccess }) => {
  const [data, setData] = useState({ title: "", description: "", selectedFile: "" });
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    if (!tagInput) return;
    setTags([...tags, tagInput]);
    setTagInput("");
  };

  const submitBlog = async () => {
    const author = getUserId();
    const payload = { ...data, tags, author };

    try {
      await API.post("/blog", payload);
      onSuccess();
      onClose();
      alert("Blog created successfully!");
    } catch (err) {
      alert("Failed to create blog");
    }
  };

  return (
    <div className={`modal fade ${show ? "show d-block" : ""}`} tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content p-3">

          <div className="modal-header">
            <h5 className="modal-title fw-bold">Create Blog</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            
            <div className="mb-3">
              <label className="form-label fw-semibold">Title</label>
              <input type="text" className="form-control" onChange={(e) => setData({ ...data, title: e.target.value })}/>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Description</label>
              <textarea rows="4" className="form-control" onChange={(e) => setData({ ...data, description: e.target.value })}></textarea>
            </div>

            {/* Tags */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Tags</label>
              <div className="d-flex gap-2">
                <input className="form-control" value={tagInput} onChange={(e) => setTagInput(e.target.value)} />
                <button className="btn btn-dark" onClick={addTag}>Add</button>
              </div>
            </div>

          </div>

          <div className="modal-footer">
            <button className="btn btn-success w-100" onClick={submitBlog}>
              Publish Blog
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BlogModal;
