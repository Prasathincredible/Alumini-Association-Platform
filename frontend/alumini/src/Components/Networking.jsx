import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function Networking() {
  const { user } = useContext(UserContext);
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/conversations/${user.userName}`);
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, [user.userName]);

  const handleConversationClick = (partner) => {
    // Navigate to chat with selected user
    navigate(`/chat/${partner}`);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Conversations</h1>
      {conversations.length === 0 ? (
        <p className="text-gray-500">No conversations yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {conversations.map((conv) => {
            const partner =
              conv.sender === user.userName ? conv.receiver : conv.sender;
            return (
              <div
                key={conv._id}
                onClick={() => handleConversationClick(partner)}
                className="p-4 bg-white rounded-xl shadow hover:bg-gray-100 cursor-pointer"
              >
                <h2 className="text-lg font-semibold text-gray-700">Chat with {partner}</h2>
                <p className="text-sm text-gray-500 mt-1">Last Message: {conv.lastMessage}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Networking;
