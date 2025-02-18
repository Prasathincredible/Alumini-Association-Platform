import React, { useState } from "react";
import axios from "axios";
import RazorpayPayment from "./RazorpayPayment"; // Import RazorpayPayment Component

const Donate = () => {
    const [orderDetails, setOrderDetails] = useState(null);

    const handlePayment = async () => {
        try {
            const { data } = await axios.post("http://localhost:3000/job/donate", {
                amount: 1, // ₹1
                currency: "INR",
            });

            // Save order details in state
            setOrderDetails(data);
        } catch (error) {
            console.log("Payment failed:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h2 className="text-2xl font-bold text-gray-800">Support Your Alumni Association</h2>
            <button
                onClick={handlePayment}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
            >
                Donate ₹1
            </button>

            {/* Show RazorpayPayment Component when order details are available */}
            {orderDetails && (
                <RazorpayPayment
                    orderId={orderDetails.id} // Pass order ID
                    amount={orderDetails.amount}
                    currency={orderDetails.currency}
                    userEmail="prasathpachamalai@gmail.com"
                />
            )}
        </div>
    );
};

export default Donate;
