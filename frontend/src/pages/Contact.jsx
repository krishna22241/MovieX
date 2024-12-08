import React from 'react'
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import '../style/contact.css'
import icon from "../assets/icon.png";
function Contact() {
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
            <div className="contact">
                <p>We'd love to hear from you! Whether you have questions, feedback, or need assistance, feel free to reach out.</p>

                <h3>Get in Touch</h3>
                <div className="contact-details">
                    <ul>
                        <li>Email: <a href="mailto:support@moviex.com">support@moviex.com</a></li>
                        <li>Phone: XXXXXXXXXX</li>
                        <li>Address: ABC, 1234 Film Lane, Hollywood, CA 90028</li>
                    </ul>
                </div>

                <h3>Social Media</h3>
                <div className="social-media">
                    <a href="https://www.facebook.com/MovieX" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://twitter.com/MovieX" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://www.instagram.com/MovieX" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>

                <h3>Send Us a Message</h3>
                <div className="contact-form">
                    <form>
                        <label>Name (required):</label>
                        <input type="text" required />

                        <label>Email (required):</label>
                        <input type="email" required />

                        <label>Subject:</label>
                        <select>
                            <option value="feedback">Feedback</option>
                            <option value="support">Support</option>
                            <option value="other">Other</option>
                        </select>

                        <label>Message (required):</label>
                        <textarea required></textarea>

                        <button type="submit">Submit</button>
                    </form>
                </div>

                <h3>FAQs</h3>
                <div className="faq-section">
                    <ul>
                        <li><a href="/faq#general">What is MovieX?</a></li>
                        <li><a href="/faq#pricing">How much does MovieX cost?</a></li>
                        <li><a href="/faq#support">How can I contact support?</a></li>
                        <li><a href="/faq#features">What features does MovieX offer?</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Contact;