import Popup from "reactjs-popup";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import { MdOutlinePersonSearch } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import UserLogo from "../Header/userlogo1.png"
import "./index.css";

const API_URL = "http://localhost:5000";

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    about:"",
    phone: "",
    address: "",
    geo: "",
    company: "",
  });

  /** Fetch all users */
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/users`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /** Handle input change */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /** Create user */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("User saved:", data);
      fetchUsers(); // refresh list
      setFormData({
        username: "",
        email: "",
        about:"",
        phone: "",
        address: "",
        geo: "",
        company: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  /** Delete user */
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
      fetchUsers();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  /** Filter users */
  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mainCon">
      <Header />
      <div className="bottomCon">
        <div className="searchContainer">
          <div>
            <Popup
              modal
              trigger={<button className="createUserbtn btn btn-primary">Create User</button>}
            >
              {(close) => (
                <div className="popup-container">
                  <h1 className="popup-title">Create New User</h1>
                  <button onClick={() => close()} className="popup-close">
                    <IoMdCloseCircleOutline />
                  </button>

                  <form onSubmit={handleSubmit} className="popup-form">
                    <label>User Name</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter User Name"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />

                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter User Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                    <label>About</label>
                    <textarea id="about"
                    name="about" rows="10"cols="40"
                    placeholder="Write a short bio or description about user here..." 
                    value={formData.about} onChange={handleChange} maxlength="1000">
                    </textarea>
                  

                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Enter Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                    />

                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter Address"
                      value={formData.address}
                      onChange={handleChange}
                    />

                    <label>Geo Location</label>
                    <input
                      type="text"
                      name="geo"
                      placeholder="Enter Geo Location"
                      value={formData.geo}
                      onChange={handleChange}
                    />

                    <label>Company</label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Enter Company Name"
                      value={formData.company}
                      onChange={handleChange}
                    />

                    <button type="submit" className="save-btn">
                      Save
                    </button>
                  </form>
                </div>
              )}
            </Popup>
          </div>
          <div className="searchCon">
            <input
              className="searchInput"
              placeholder="Search Users List..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <MdOutlinePersonSearch className="searchIcon" />
          </div>
        </div>
        <h1 className="user-list-heading">Users List !</h1>
        <div className="users-list">
          {filteredUsers.map((user) => (
              <div key={user.id} className="user-card">
                <div>
                <h3>{user.username}</h3>
                <p><strong>Email: </strong>{user.email}</p>
                <p><strong>Phone: </strong>{user.phone}</p>
                <p><strong>Company: </strong>{user.company}</p>
                <div className="card-actions">
                  <button className="btn btn-info" onClick={() => navigate(`/user/${user.id}`)}>View</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                </div>
                </div>
                <img className="list-user-logo" src={UserLogo} alt="userlogo" />
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
