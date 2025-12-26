import React, { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import BlogModal from "../components/BlogModal";
import "../styles/home.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBlogs = async () => {
    const res = await API.get(`/blog?page=${page}`);
    setBlogs(res.data.blogs);
    setTotalPages(res.data.totalPages);
  };

  useEffect(() => {
    fetchBlogs();
  }, [page]);

 const removeBlog = (id) => {
  setBlogs((prev) => prev.filter((b) => b._id !== id));
};


  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.description.toLowerCase().includes(search.toLowerCase()) ||
    b.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const tagFiltered = activeTag
    ? filteredBlogs.filter((b) => b.tags.includes(activeTag))
    : filteredBlogs;

  return (
    <>
      <Navbar onOpenCreate={() => setShowCreate(true)} />

      <div className="container mt-4">

        {/* Search */}
        <div className="input-group mb-4">
          <input
            className="form-control"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="input-group-text bg-dark text-white">🔍</span>
        </div>

        {activeTag && (
          <div className="alert alert-info d-flex justify-content-between">
            <span>Filtering by: #{activeTag}</span>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => setActiveTag(null)}
            >
              Clear
            </button>
          </div>
        )}

        {/* Blog Grid */}
        <div className="row">
          {tagFiltered.length === 0 ? (
            <p>No blogs found.</p>
          ) : (
            tagFiltered.map((b) => (
              <BlogCard
                key={b._id}
                blog={b}
                onDelete={removeBlog}
                onTagClick={setActiveTag}
               />

            ))
          )}
        </div>

        {/* Pagination */}
        <nav className="mt-4 d-flex justify-content-center">
          <ul className="pagination">
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  page === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Create Blog Modal */}
      <BlogModal
        show={showCreate}
        onClose={() => setShowCreate(false)}
        onSuccess={fetchBlogs}
      />
    </>
  );
};

export default Home;
