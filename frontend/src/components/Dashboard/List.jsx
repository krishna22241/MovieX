import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../style/list.css'; 
import { AuthContext } from "../../context/AuthContext";

const List = () => {
  const [lists, setLists] = useState([]);
  const { authToken } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get("http://localhost:8000/lists/getLists", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setLists(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch lists. Please try again later.");
      }
    };

    fetchLists();
  }, [authToken]);

  const handleOpenList = (id) => {
    navigate(`/lists/${id}`); // Navigate to the list details page
  };

  const handleRemoveList = async (id) => {
    try {
      await axios.post(
        "http://localhost:8000/lists/delete",
        { listId: id },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setLists((prevLists) => prevLists.filter((list) => list._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to remove the list. Please try again.");
    }
  };

  return (
    <div className="list-container">
      <h2> WatchList</h2>
      {error && <p className="error-message">{error}</p>}
      {lists.length > 0 ? (
        <ul>
          {lists.map((list) => (
            <li key={list._id} className="list-item">
              <span>{list.name}</span>
              <div className="list-actions">
                <button onClick={() => handleOpenList(list._id)}>Open</button>
                <button onClick={() => handleRemoveList(list._id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-message">No lists available. Create your first list!</p>
      )}
    </div>
  );
};

export default List;
