import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Thank You! 🎉</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your donation has been received. You are helping us build a stronger alumni community! ❤️
      </p>
      <Link
        to="/donate"
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
      >
        Back
      </Link>
    </div>
  );
};

export default ThankYou;
