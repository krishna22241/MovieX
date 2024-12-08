import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../../style/res.css";
import { AuthContext } from "../../context/AuthContext";
import icon from "../../assets/icon.png"; 
import { Link } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const title = query.get("title");
  const { authToken,setAuthToken } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userLists, setUserLists] = useState([]);
  const [selectedList, setSelectedList] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  // Fetch movies based on the search query
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/movies/search?title=${title}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setMovies(response.data.movies);
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError("Failed to fetch movies. Please try again later.");
        setLoading(false); // Set loading to false on error
      }
    };
    if (title && authToken) fetchMovies();
  }, [title, authToken]);

  // Fetch user lists
  useEffect(() => {
    const fetchUserLists = async () => {
      try {
        const response = await axios.get("http://localhost:8000/lists/getLists", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setUserLists(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch lists. Please try again later.");
      }
    };
    if (authToken) fetchUserLists();
  }, [authToken]);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?title=${searchTerm}`);
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

  // Handle adding a movie to a list
  const handleAddToList = async (movieId, listId) => {
    try {
      await axios.post(
        "http://localhost:8000/lists/add",
        { listId, movieId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      navigate(`/lists/${listId}`);
      // alert("Movie added")
      
    } catch (err) {
      console.error(err);
      setError("Failed to add movie to list. Please try again.");
    }
  };

  return (
    <div className="searchr">
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

      <div className="search-results-container">
        <h2>Search Results for "{title}"</h2>
        {loading && <div className="loading-spinner">Loading...</div>} {/* Show loading message or spinner */}
        {error && <p className="error-message">{error}</p>}
        <div className="movies-grid">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.imdbID} className="movie-card">
                <img src={movie.Poster} alt={movie.Title} />
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
                <div className="list-dropdown">
                  <select
                    value={selectedList[movie.imdbID] || ""}
                    onChange={(e) =>
                      setSelectedList({
                        ...selectedList,
                        [movie.imdbID]: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      Select a list
                    </option>
                    {userLists.map((list) => (
                      <option key={list._id} value={list._id}>
                        {list.name}
                      </option>
                    ))}
                  </select>
                  <button className="butt"
                    onClick={() =>
                      handleAddToList(movie.imdbID, selectedList[movie.imdbID])
                    }
                    disabled={!selectedList[movie.imdbID]}
                  >
                    Add to List
                  </button>
                </div>
              </div>
            ))
          ) : (
            !loading && <p>No movies found.</p> // Show this if no movies are found and loading is false
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;



