import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"],
});

// --- Your Cloudinary details ---
const CLOUDINARY_CLOUD_NAME = "dljz9g6hg"; 
const CLOUDINARY_API_KEY = 376781573396975
const UPLOAD_PRESET= "ml_default"; // <-- Add your API key here

function Chat() {
  const { user } = useContext(UserContext);
  const { receiverName } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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

  // Function to upload file securely
  const uploadFileToCloudinary = async (file) => {
    try {
      // 1. Get signature and timestamp from backend
      const signatureRes = await axios.post('http://localhost:3000/upload/generate-signature');
      const { signature, timestamp } = signatureRes.data;

      console.log("Signature:", signature);
      console.log("Timestamp:", timestamp);


      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", CLOUDINARY_API_KEY);
      formData.append("upload_preset",UPLOAD_PRESET); // optional upload preset
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
    

      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
        formData
      );

      return cloudinaryRes.data.secure_url; // uploaded file URL
    } catch (error) {
      console.error("Secure file upload failed:", error);
      throw error;
    }
  };

  const sendMessage = async () => {
    if (!text.trim() && !file) return;

    let fileUrl = "";
    let fileType = "";

    if (file) {
      try {
        fileUrl = await uploadFileToCloudinary(file);
        fileType = file.type.startsWith("image") ? "image" : "pdf";
      } catch (error) {
        return; // stop sending message if upload fails
      }
    }

    const messageData = {
      sender: user.userName,
      receiver: receiverName,
      text: text.trim(),
      fileUrl,
      fileType,
      createdAt: new Date().toISOString(),
    };

    socket.emit("sendMessage", messageData);
    setMessages((prev) => [...prev, messageData]);
    setText("");
    setFile(null);
  };

  useEffect(() => {
    const chatContainer = document.querySelector(".chat-messages");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const groupMessagesByDate = (msgs) => {
    const grouped = {};
    msgs.forEach((msg) => {
      const dateKey = new Date(msg.createdAt).toDateString();
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(msg);
    });
    return grouped;
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto border border-gray-300 rounded-lg shadow-lg bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">
          Chat with <span className="text-blue-600">@{receiverName}</span>
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50 chat-messages space-y-6">
        {Object.entries(groupedMessages).map(([dateKey, msgs]) => (
          <div key={dateKey}>
            <div className="text-center text-sm text-gray-500 mb-4">
              {formatDate(msgs[0].createdAt)}
            </div>
            {msgs.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  msg.sender === user.userName ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`px-5 py-3 rounded-lg shadow-sm max-w-md text-sm whitespace-pre-wrap ${
                    msg.sender === user.userName
                      ? "bg-blue-600 text-white rounded-br-md"
                      : "bg-white border text-gray-800 rounded-bl-md"
                  }`}
                >
                  {/* Render text */}
                  {msg.text && <div>{msg.text}</div>}

                  {/* Render file if exists */}
                  {msg.fileUrl && (
                    <>
                      {msg.fileType === "image" ? (
                        <img
                          src={msg.fileUrl}
                          alt="Uploaded"
                          className="mt-2 rounded-md max-h-60 object-cover"
                        />
                      ) : (
                        <a
                          href={msg.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 text-blue-200 underline"
                        >
                          Download PDF
                        </a>
                      )}
                    </>
                  )}
                </div>
                <span className="text-xs text-gray-400 mt-1">
                  {formatTime(msg.createdAt)}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-3 px-6 py-4 border-t bg-white">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
          id="fileUpload"
          accept="image/*,.pdf"
        />
        <label htmlFor="fileUpload" className="cursor-pointer px-3 py-2 border border-gray-400 rounded-md hover:bg-gray-100">
          📎
        </label>
        <button
          onClick={sendMessage}
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
