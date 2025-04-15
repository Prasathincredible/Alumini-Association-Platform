import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3000",{
    transports: ['websocket', 'polling']
  });

function Chat() {
  const { user } = useContext(UserContext); // Get logged-in user
  const { receiverName }= useParams(); // Get the user to chat with
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (user) {
      socket.emit("join", user._id);
    }

    // Fetch chat history
    axios
      .get(`http://localhost:3000/messages/${user.name}/${receiverName}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));

    // Listen for new messages
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [user, receiverName]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const messageData = {
      senderName: user.name,
      receiverName: receiverName,
      text,
    };

    // Emit message to the server
    socket.emit("sendMessage", messageData);
    setMessages((prev) => [...prev, messageData]);

    setText(""); // Clear input field
  };

  return (
    <div className="chat-container">
      <h2>Chat</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index} className={msg.senderName === user.name ? "sent" : "received"}>
            {msg.text}
          </p>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
