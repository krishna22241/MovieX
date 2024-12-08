import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../style/register.css';

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // **Updated the backend URL to match your routes**
      const response = await axios.post("http://localhost:8000/auth/register", formData);
      setMessage(response.data.message || "Registration successful!");
      setIsSuccess(true);
      navigate("/login");
      // setTimeout(() => {
      //   navigate("/login"); // **Navigate to login page after successful registration**
      // }, 2000);
    } catch (err) {
      setMessage(err.response?.data || "Something went wrong. Please try again.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="main">
    
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p className={isSuccess ? "success" : "error"}>{message}</p>} 
    </div></div>
  );
};

export default Register;
