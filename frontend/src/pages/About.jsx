import React from 'react'
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import '../style/about.css'
import icon from "../assets/icon.png"; 

function About() {
    const { id } = useParams();
    const { authToken, setAuthToken } = useContext(AuthContext);
    
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
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
    
    return (
      <div className="sec">
        <nav className="navbar">
        <div className="navbar-left">
          <h2 className="navbar-heading">MovieX
          </h2>
          <div className="centre">
          <Link to='/dashboard' className="home-button"> Home</Link>
            <Link to='/about' className="home-button"> About</Link>
            <Link to='/contact' className="home-button"> ContactUs</Link>
           
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
      <div className="content">
        <h2>About Us</h2>
        <p>
          Welcome to <strong>MovieX</strong>, your ultimate destination for
          personalized movie recommendations and seamless movie exploration! At
          MovieX, we believe that watching movies is more than just
          entertainment—it's an experience that can brighten your day, inspire
          your imagination, and create lasting memories.
        </p>

        <h3>Who We Are</h3>
        <p>
          We are a passionate team of movie enthusiasts, tech innovators, and
          data scientists dedicated to revolutionizing the way you discover
          movies. Our platform merges cutting-edge technology with your unique
          preferences to create a tailored movie-watching experience like no
          other.
        </p>

        <h3>Our Vision</h3>
        <p>
          Our vision is to make <strong>MovieX</strong> the go-to platform for
          movie lovers worldwide. We aim to connect people with films that
          resonate with their tastes, emotions, and moments in life. Whether
          you're looking for the perfect movie for a rainy day or seeking out
          the latest blockbuster, MovieX is here to guide you.
        </p>

        <h3>What We Offer</h3>
        <ul>
          <li>
            <strong>Personalized Recommendations:</strong> Using advanced
            machine learning algorithms, we analyze your viewing habits,
            preferences, and even local trends to suggest movies you'll love.
          </li>
          <li>
            <strong>Weather and Location-Based Suggestions:</strong> Ever
            wondered what movie suits a cozy winter evening or a sunny beach
            day? MovieX considers your environment to provide recommendations
            tailored to your current mood and setting.
          </li>
          <li>
            <strong>Keyword and Actor-Based Searches:</strong> Find movies
            based on specific themes, genres, or your favorite actors with ease.
          </li>
          <li>
            <strong>Trending and Global Insights:</strong> Stay updated with
            what's popular around the world and discover hidden gems you might
            have missed.
          </li>
          <li>
            <strong>User-Curated Lists:</strong> Create your own movie
            collections, whether public or private, and share your cinematic
            journey with friends and family.
          </li>
        </ul>

        <h3>Our Technology</h3>
        <p>
          <strong>MovieX</strong> harnesses the power of the MERN stack
          (MongoDB, Express.js, React.js, Node.js) and machine learning to
          deliver an intuitive, responsive, and data-driven platform. Our team
          continuously works on improving our algorithms to ensure
          recommendations evolve with your changing tastes.
        </p>

        <h3>Why Choose MovieX?</h3>
        <p>
          Unlike generic streaming platforms, MovieX offers a personalized
          experience that focuses solely on enhancing your movie discovery
          journey. We celebrate individuality and bring you recommendations that
          match your unique preferences and lifestyle.
        </p>

        <h3>Join Us Today!</h3>
        <p>
          Become a part of the <strong>MovieX</strong> community and explore a
          world of movies like never before. Whether you’re a film buff or a
          casual viewer, MovieX is your partner in discovering cinematic
          treasures.
        </p>
        <p>
          At <strong>MovieX</strong>, every movie tells a story, and every
          viewer deserves a story worth watching. Let’s explore the magic of
          movies together!
        </p>
      </div>
    </div>
  );
}

export default About;