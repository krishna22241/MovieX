import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import List from "../components/Dashboard/List";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/dash.css";
import icon from "../assets/icon.png"; 
import Static from "../components/Static";

const Dashboard = () => {
  const { authToken, setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog state
  const [listName, setListName] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/auth/logout", {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setAuthToken(null);
      localStorage.removeItem("authToken");
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err.response?.data || err.message);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?title=${searchTerm}`);
    }
  };

  const handleCreateList = async () => {
    if (!listName.trim()) return alert("List name cannot be empty!");

    try {
      const response = await axios.post(
        "http://localhost:8000/lists/create",
        { name: listName, isPublic },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      alert(response.data.message || "List created successfully!");
      setListName("");
      setIsPublic(false);
      setIsDialogOpen(false); // Close dialog after success
      window.location.reload();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to create the list.");
    }
  };

  if (!authToken) {
    return (
      <div className="dashboard-container">
        <p className="auth-message">Please log in to access the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <h2 className="navbar-heading">MovieX
          </h2>
          <div className="centre">
          <Link to='/dashboard' className="home-button"> Home</Link>
            <Link to='/about' className="home-button"> About</Link>
            <Link to='/contact' className="home-button"> ContactUs</Link>
            <button className="create" onClick={() => setIsDialogOpen(true)}>
            Create List
          </button>
          </div>
          
        </div>
     
        <div className="searching">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search movies..."
                className="search-bar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="im">
                <img
                  src={icon}
                  alt="Search Icon"
                  className="navbar-icon"
                  onClick={handleSearchSubmit}
                />
              </span>
            </form>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
      </nav>

      {/* Dialog Box */}
      {isDialogOpen && (
        <div className="dialog-backdrop">
          <div className="dialog-box">
            <h3>Create a New List</h3>
            <input
              type="text"
              placeholder="Enter list name"
              className="list-name-input"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
            <label className="public-toggle">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              Public
            </label>
            <div className="dialog-actions">
              <button className="create" onClick={handleCreateList}>
                Create
              </button>
              <button className="cancel" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content: List */}
      <div className="list-section">
        <List token={authToken} searchTerm={searchTerm} />
      </div>
      <Static />
    </div>
  );
};

export default Dashboard;
