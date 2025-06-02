import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const apiurl = import.meta.env.VITE_API_URL;

function Networking() {
  const { user } = useContext(UserContext);
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(`${apiurl}/conversations/${user.userName}`);
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, [user.userName]);

  const handleConversationClick = (partner) => {
    navigate(`/chat/${partner}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 relative">
      {/* Back Button - Outside the container */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-indigo-600 transition"
      >
        <ArrowBack className="mr-1" />
        Back
      </button>

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          💬 Your Conversations
        </h1>

        {conversations.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No conversations yet. Start chatting with your network!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {conversations.map((conv) => {
              const partner =
                conv.sender === user.userName ? conv.receiver : conv.sender;
              return (
                <div
                  key={conv._id}
                  onClick={() => handleConversationClick(partner)}
                  className="flex items-center p-4 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-xl shadow-sm hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xl font-bold">
                      {partner.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold text-gray-700">{partner}</h2>
                    <p className="text-sm text-gray-500">Tap to continue chat</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Networking;
