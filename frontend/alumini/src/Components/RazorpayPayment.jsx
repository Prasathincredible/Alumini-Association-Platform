import React from "react";

const RazorpayPayment = ({ orderId, amount, currency, userEmail }) => {
    const handleRazorpay = () => {
        const options = {
            key: "rzp_test_vVOR8zLdnVy6pz", // Replace with your Razorpay Key ID
            amount: amount * 100, // Convert to paise (₹1 = 100 paise)
            currency: currency,
            name: "Alumni Donation",
            description: "Support Your College",
            order_id: orderId, // Order ID from backend response
            handler: function (response) {
                alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                console.log("Payment Success:", response);
                // Send this response to your backend for verification
            },
            prefill: {
                name: "Prasath",
                email: userEmail,
                contact: "9597567083",
            },
            theme: {
                color: "#3399cc",
            },
            method:"upi"

        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <button onClick={handleRazorpay} className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-700 transition">
            Proceed to Pay ₹{amount / 100}
        </button>
    );
};

export default RazorpayPayment;
