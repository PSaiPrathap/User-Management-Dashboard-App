import Popup from "reactjs-popup"
import Header from "../Header";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import UserLogo from "../Header/userlogo1.png"
import "./index.css"

const API_URL = "http://localhost:5000";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [editData, setEditData] = useState({});

  /** Fetch user details */
  const fetchUser = async () => {
    try {
      const res = await fetch(`${API_URL}/users/${id}`);
      const data = await res.json();
      setUser(data);
      setEditData(data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);
  

  /** Handle input change */
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  /** Update user */
  const handleUpdate = async () => {
    try {
      await fetch(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      fetchUser();
    } catch (err) {
      console.error("Error updating:", err);
    }
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="user-details">
      <Header/>
      <h1 className="user-details-header">User Details</h1>
        <div className="profilecontainer">
          <div className="profile-info">
            <h1 className="mb-4"><strong>Name:</strong> {user.username}</h1>
            <p><b>Email:</b> {user.email}</p>
            <p><b>About:</b> {user.about}</p>
            <p><b>Phone:</b> {user.phone}</p>
            <p><b>Address:</b> {user.address}</p>
            <p><b>Geo:</b> {user.geo}</p>
            <p><b>Company:</b> {user.company}</p>
            <Popup
            modal
            trigger={
              <button className="btn btn-warning me-5">Edit</button>
            }
            >
              {close=>(
                <div className="edit-form">
                  <strong><h2>Edit User Details</h2></strong>
                  <label htmlFor="name">Name</label>
                  <input id="name" name="username" value={editData.username} onChange={handleChange} />
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" value={editData.email} onChange={handleChange} />
                  <label htmlFor="about">About</label>
                  <textarea id="about" name="about" value={editData.about} rows="10"cols="40" maxlength="1000" onChange={handleChange}></textarea>
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" value={editData.phone} onChange={handleChange} />
                  <label htmlFor="address">Address</label>
                  <input id="address" name="address" value={editData.address} onChange={handleChange} />
                  <label htmlFor="geo">Geo</label>
                  <input id="geo" name="geo" value={editData.geo} onChange={handleChange} />
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" value={editData.company} onChange={handleChange} />
                  <button onClick={handleUpdate}>Save</button>
                </div>
              )}

            </Popup>
            <button className="btn btn-dark" onClick={() => navigate("/")}>Back</button>
          </div>
          <img className="profileimage" src={UserLogo} alt="userProfileLogo" />
        </div>
    </div>
  );
};

export default UserDetails;
