import  { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../../style/login.css';

const Login = () => {
  const { setAuthToken } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/login", formData);
      setAuthToken(response.data.token); 
      setMessage("Login successful!");
      setIsSuccess(true);
      navigate("/dashboard");
      // setTimeout(() => {
      //   navigate("/dashboard");
      // }, 2000);
    } catch (err) {
      setMessage(err.response?.data || "Login failed. Please try again.");
      setIsSuccess(false);
    }
  };

  return (
   <div className="outer">
     <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      {message && <p className={isSuccess ? "success" : "error"}>{message}</p>} {/* **Added error styling** */}
    </div>
   </div>
  );
};

export default Login;
