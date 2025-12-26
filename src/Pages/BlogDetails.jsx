import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");

  const fetchBlog = async () => {
    const res = await API.get(`/blog/${id}`);
    setBlog(res.data.blogPost);
  };

  const addComment = async () => {
    await API.post(`/blog/comment/${id}`, { text: comment });
    setComment("");
    fetchBlog();
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  if (!blog) return <h3 className="text-center mt-5">Loading...</h3>;

  const randomImage =
    "https://source.unsplash.com/random/1200x600/?technology,code";

  return (
    <div className="container mt-5 mb-5">
      <img
        src={blog.selectedFile || randomImage}
        className="img-fluid rounded shadow mb-4"
        alt=""
      />

      <h1 className="fw-bold">{blog.title}</h1>

      <p className="mt-3 fs-5">{blog.description}</p>

      <hr />

      {/* Comments */}
      <h4 className="fw-bold">Comments</h4>

      {blog.comments.map((c, i) => (
        <div key={i} className="p-2 border rounded mb-2">
          <p className="mb-1">{c.text}</p>
          <small className="text-muted">
            {new Date(c.createdAt).toLocaleString()}
          </small>
        </div>
      ))}

      <textarea
        className="form-control mt-3"
        rows="3"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      <button className="btn btn-dark mt-2" onClick={addComment}>
        Post Comment
      </button>

      <div className="mt-4">
        <Link to="/home" className="btn btn-secondary">Back</Link>
      </div>
    </div>
  );
};

export default BlogDetails;
