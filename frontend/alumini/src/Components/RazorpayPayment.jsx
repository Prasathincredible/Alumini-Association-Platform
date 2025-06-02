import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
 const apiurl=import.meta.env.VITE_API_URL;

const RazorpayPayment = ({ orderId, amount, currency, userEmail, selectedDonation, donationAmount }) => {
    const navigate = useNavigate();

    const handleRazorpay = () => {
        const options = {
            key: "rzp_test_vVOR8zLdnVy6pz",
            amount: amount * 100,
            currency: currency,
            name: "Alumni Donation",
            description: "Support Your College",
            order_id: orderId,
            handler: async function (response) {
                alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                console.log("Payment Success:", response);

                // Save success payment
                try {
                    await axios.post(`${apiurl}/save-donation-payment`, {
                        paymentId: response.razorpay_payment_id,
                        orderId: response.razorpay_order_id,
                        amount: donationAmount,
                        donationPostId: selectedDonation._id,
                        userEmail: userEmail,
                        status: "success",
                    });
                    console.log("Payment saved successfully ✅");
                    navigate("/thankyou"); // <-- Navigate to Thank You Page
                } catch (error) {
                    console.error("Error saving successful payment:", error);
                }
            },
            prefill: {
                name: "Prasath",
                email: userEmail,
                contact: "9597567083",
            },
            theme: {
                color: "#3399cc",
            },
            method: {
                upi: true,
                card: true,
                netbanking: true,
            },
        };

        const rzp = new window.Razorpay(options);

        rzp.on("payment.failed", async function (response) {
            alert(`Payment Failed! Reason: ${response.error.description}`);
            console.log("Payment Failed:", response.error);

            // Save failed payment
            try {
                await axios.post(`${apiurl}/save-donation-payment`, {
                    paymentId: response.error.metadata.payment_id,
                    orderId: response.error.metadata.order_id,
                    amount: donationAmount,
                    donationPostId: selectedDonation._id,
                    userEmail: userEmail,
                    status: "failed",
                });
                console.log("Failed payment saved successfully ❌");
            } catch (error) {
                console.error("Error saving failed payment:", error);
            }
        });

        rzp.open();
    };

    return (
        <button
            onClick={handleRazorpay}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-700 transition"
        >
            Proceed to Pay ₹{amount}
        </button>
    );
};

export default RazorpayPayment;
