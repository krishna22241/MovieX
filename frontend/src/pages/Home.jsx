// import React from "react";
import { Link } from "react-router-dom";
import '../style/home.css';
import snac from '../assets/snac.png';
const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
        <h1>Welcome to  the world of <span className="lib">MovieX</span></h1>
        <p>
          Discover an incredible collection of movies at your fingertips. Sign
          in to create personalized lists, explore recommendations, and enjoy
          the magic of cinema like never before!
        </p>
        <div className="button-group">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
      <div className="right">
        <img src={snac} alt="" className="snac" />
      </div>
    </div>
  );
};

export default Home;
