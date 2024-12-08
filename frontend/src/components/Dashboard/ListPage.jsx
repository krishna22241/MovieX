// import { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from "../../context/AuthContext";
// import '../../style/listpg.css';

// const ListPage = () => {
//   const { id } = useParams(); // Extract list ID from the route
//   const { authToken, setAuthToken } = useContext(AuthContext); // Get the user's token and set function
//   const [list, setList] = useState(null); // Holds list details
//   const [error, setError] = useState(null); // Handles errors
//   const navigate = useNavigate(); // Use navigate to redirect after logout

//   useEffect(() => {
//     const fetchList = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/lists/${id}`, {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         });
//         setList(response.data); // Set the fetched list
//       } catch (err) {
//         console.error("Error fetching list:", err.response || err.message);
//         setError("Failed to load the list. Please try again later.");
//       }
//     };

//     if (id && authToken) fetchList();
//   }, [id, authToken]);

//   const handleLogout = async () => {
//     try {
//       await axios.get("http://localhost:8000/auth/logout", {
//         headers: { Authorization: `Bearer ${authToken}` },
//       });

//       setAuthToken(null);
//       localStorage.removeItem("authToken");
//       navigate("/"); // Navigate to the home page after logout
//     } catch (err) {
//       console.error("Logout failed", err.response?.data || err.message);
//     }
//   };

//   if (error) return <p className="error-message">{error}</p>;
//   if (!list) return <p className="loading-message">Loading...</p>;

//   return (
//     <div className="lp">
//       <nav className="navbar">
//         <div className="navbar-left">
//           <h2 className="navbar-heading">
//             <button className="home-button" onClick={() => navigate("/dashboard")}>
//               Movie Library
//             </button>
//           </h2>
//         </div>
//         <div className="navbar-right">
//           <button onClick={handleLogout} className="logout-button">
//             Logout
//           </button>
//         </div>
//       </nav>
      
//       <div className="list-page-container">
//         <h2 className="list-title">{list.name}</h2>
//         <div className="movies-gri">
//           {list.movies.length > 0 ? (
//             list.movies.map((movie) => (
//               <div key={movie._id} className="movie-car">
//                 <img src={movie.Poster || "/placeholder.png"} alt={movie.title} />
//                 <h3>{movie.title}</h3>
//                 <p>{movie.year}</p>
//               </div>
//             ))
//           ) : (
//             <p>No movies in this list.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ListPage;


import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "../../style/listpg.css";
import icon from "../../assets/icon.png"; 

const ListPage = () => {
  const { id } = useParams();
  const { authToken, setAuthToken } = useContext(AuthContext);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [list, setList] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/lists/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        // console.log(response.data.Poster);
        setList(response.data);
      } catch (err) {
        console.error("Error fetching list:", err.response || err.message);
        setError("Failed to load the list. Please try again later.");
      }
    };

    if (id && authToken) fetchList();
  }, [id, authToken]);

  const handleRemoveMovie = async (movieId) => {
    try {
      await axios.post(
        "http://localhost:8000/lists/remove",
        { listId: id, movieId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setList((prev) => ({
        ...prev,
        movies: prev.movies.filter((movie) => movie._id !== movieId),
      }));
    } catch (err) {
      console.error("Error removing movie:", err.response || err.message);
      setError("Failed to remove the movie. Please try again.");
    }
  };

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

  if (error) return <p className="error-message">{error}</p>;
  if (!list) return <p className="loading-message">Loading...</p>;

  return (
    <div className="lp">
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

      
      <div className="list-page-container">
        <h2 className="list-title">{list.name}</h2>
        <div className="movies-gri">
          {list.movies.length > 0 ? (
            list.movies.map((movie) => (
              <div key={movie._id} className="movie-car">
                <img src={movie.Poster} alt={movie.title} />
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveMovie(movie._id)}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>No movies in this list.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListPage;
