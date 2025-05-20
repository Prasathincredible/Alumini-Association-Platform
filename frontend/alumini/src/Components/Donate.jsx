import React, { useState, useEffect } from "react";
import axios from "axios";
import RazorpayPayment from "./RazorpayPayment";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const Donate = () => {
  const [donations, setDonations] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");
  const {user}=useContext(UserContext) // store the entered amount

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get("https://campus-bridge-zb03.onrender.com/donation/all");
        setDonations(response.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };
    fetchDonations();
  }, []);

  const handlePayment = async (donation) => {
    const enteredAmount = prompt("Enter the amount you wish to donate (in ₹):");

    if (!enteredAmount || isNaN(enteredAmount) || enteredAmount <= 0) {
      alert("Please enter a valid amount greater than ₹0");
      return;
    }

    try {
      const { data } = await axios.post("https://campus-bridge-zb03.onrender.com/donate", {
        amount: enteredAmount, // Send the user's entered amount
        currency: "INR",
      });

      setOrderDetails(data);
      setSelectedDonation(donation);
      setDonationAmount(enteredAmount);
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Support Alumni Causes</h2>

      {donations.length === 0 ? (
        <p className="text-center text-gray-500">No donations available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <div key={donation._id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
              {/* Donation Media */}
              {donation.mediaType === "image" ? (
                <img
                  src={donation.mediaUrl}
                  alt="Donation"
                  className="w-full h-60 object-cover"
                />
              ) : (
                <video
                  controls
                  src={donation.mediaUrl}
                  className="w-full h-60 object-cover"
                />
              )}

              {/* Donation Content */}
              <div className="p-4 flex flex-col flex-grow justify-between">
                <p className="text-gray-700 mb-4">{donation.caption}</p>
                <button
                  onClick={() => handlePayment(donation)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  Donate
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* RazorpayPayment popup for selected donation */}
      {orderDetails && selectedDonation && (
       <RazorpayPayment
       orderId={orderDetails.id}
       amount={orderDetails.amount}
       currency={orderDetails.currency}
       userEmail={user.email}
       selectedDonation={selectedDonation}
       donationAmount={donationAmount}
     />
      )}
    </div>
  );
};

export default Donate;
