import React, { useState } from "react";
import CreateEvent from "./CreateEvent";
 const apiurl=import.meta.env.VITE_API_URL;

function EventPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={() => setShowModal(true)}
        className="px-6 py-3 bg-teal-600 text-white rounded-lg shadow-lg"
      >
        Post an Event
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-red-500 text-xl font-bold"
            >
              ×
            </button>
            <CreateEvent />
          </div>
        </div>
      )}
    </div>
  );
}

export default EventPage;
