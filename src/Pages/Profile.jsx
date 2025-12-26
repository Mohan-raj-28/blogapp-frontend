import React, { useEffect, useState } from "react";
import API from "../api/axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    const res = await API.get("/user/profile");
    setUser(res.data.user);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="fw-bold mb-3">Profile</h2>

        <p className="fs-5"><strong>Name:</strong> {user.userName}</p>
        <p className="fs-5"><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
