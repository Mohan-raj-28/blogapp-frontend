import React, { useState } from "react";
import API from "../api/axios";
import getUserId from "../utils/getUserId";
import "../styles/form.css";

const Form = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    selectedFile: "",
  });

  const [tags, setTags] = useState([]);

  const submitBlog = async () => {
    const author = getUserId();

    const payload = { ...data, tags, author };

    const res = await API.post("/blog", payload);

    alert("Blog Created!");
  };

  return (
    <div className="form-container">
      <h1>Create Blog</h1>

      <input
        name="title"
        placeholder="Title"
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />

      <textarea
        name="description"
        placeholder="Description"
        onChange={(e) => setData({ ...data, description: e.target.value })}
      />

      <input type="file" onChange={(e) => {
        const reader = new FileReader();
        reader.onload = () => setData({ ...data, selectedFile: reader.result });
        reader.readAsDataURL(e.target.files[0]);
      }} />

      <button onClick={submitBlog}>Create</button>
    </div>
  );
};

export default Form;
