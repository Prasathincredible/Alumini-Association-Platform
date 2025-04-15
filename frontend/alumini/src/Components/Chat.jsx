import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"],
});

function Chat() {
  const { user } = useContext(UserContext);
  const { receiverName } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (user) {
      socket.emit("join", user._id);
    }

    axios
      .get(`http://localhost:3000/messages/${user.userName}/${receiverName}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));

    socket.on("receiverMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("receiverMessage");
    };
  }, [user, receiverName]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const messageData = {
      senderName: user.userName,
      receiverName: receiverName,
      text,
    };

    socket.emit("sendMessage", messageData);
    setMessages((prev) => [...prev, messageData]);
    setText("");
  };

  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto border border-gray-200 rounded-md shadow-md bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
        <h2 className="text-lg font-semibold text-gray-800">@{receiverName}</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.senderName === user.userName ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs text-sm ${
                msg.senderName === user.userName
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-900 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-4 border-t bg-white">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message..."
          className="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
