import { useState,useContext } from "react";
import axios from "axios";
import '../../style/createlist.css';
import { AuthContext } from "../../context/AuthContext";

const CreateList = () => {
  const [listName, setListName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [message, setMessage] = useState("");
  const { authToken } = useContext(AuthContext);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/lists/create",
        { name: listName, isPublic },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setMessage(response.data.message);
      setIsSuccess(true);
    } catch (err) {
      setMessage(err.response?.data?.message || "An error occurred.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="create-list-container">
      <h2>Create List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="List Name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          Public
        </label>
        <button type="submit">Create</button>
      </form>
      {message && <p className={isSuccess ? "success" : ""}>{message}</p>}
    </div>
  );
};

export default CreateList;
