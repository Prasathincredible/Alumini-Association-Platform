import React, { useState } from "react";
import axios from "axios";

function UploadDonation() {
  const [media, setMedia] = useState(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleMediaChange = (e) => {
    setMedia(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!media || !caption) {
      alert("Please add both media and caption.");
      return;
    }

    const formData = new FormData();
    formData.append("media", media);
    formData.append("caption", caption);

    try {
      setUploading(true);
      const res = await axios.post("http://localhost:3000/donation/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload success:", res.data);
      alert("Donation post uploaded successfully!");
      setMedia(null);
      setCaption("");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">Upload Donation Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Select Image/Video</label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Caption / Details</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter details about the event, scholarship, or infrastructure need..."
            rows="4"
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={uploading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadDonation;
