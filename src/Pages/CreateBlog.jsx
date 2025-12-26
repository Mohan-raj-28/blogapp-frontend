import React, { useState } from "react";
import API from "../api/axios";
import getUserId from "../utils/getUserId";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: "",
    selectedFile: ""
  });

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleTagAdd = () => {
    if (tagInput.trim() === "") return;
    setTags([...tags, tagInput.trim()]);
    setTagInput("");
  };

  const handleTagDelete = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setData({ ...data, selectedFile: reader.result });
    };

    reader.readAsDataURL(file);
  };

  const submitBlog = async () => {
    const author = getUserId();
    if (!author) {
      alert("You must be logged in to create a blog.");
      return;
    }

    const payload = { ...data, tags, author };

    try {
      await API.post("/blog", payload);
      alert("Blog created successfully!");
      navigate("/home");
    } catch (err) {
      alert("Error creating blog");
      console.log(err);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">

          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4 fw-bold">Create New Blog</h2>

            {/* TITLE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Title</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter blog title"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
            </div>

            {/* DESCRIPTION */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Description</label>
              <textarea
                className="form-control"
                rows="6"
                placeholder="Write your blog content..."
                value={data.description}
                onChange={(e) => setData({ ...data, description: e.target.value })}
              ></textarea>
            </div>

            {/* TAGS */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Tags</label>
              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add a tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                />
                <button className="btn btn-dark" onClick={handleTagAdd}>
                  Add
                </button>
              </div>

              <div className="mt-2 d-flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span key={index} className="badge bg-primary p-2">
                    {tag}{" "}
                    <button
                      className="btn btn-sm btn-light ms-2 py-0"
                      onClick={() => handleTagDelete(tag)}
                    >
                      ✖
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* IMAGE UPLOAD */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Upload Image</label>
              <input type="file" className="form-control" onChange={handleFileChange} />

              {data.selectedFile && (
                <img
                  src={data.selectedFile}
                  alt="preview"
                  className="img-fluid mt-3 rounded shadow-sm"
                />
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button className="btn btn-success btn-lg w-100 mt-3" onClick={submitBlog}>
              Publish Blog
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
