const mongoose=require('mongoose');

const DonationPaymentSchema = new mongoose.Schema({
  paymentId: { type: String, required: true },
  orderId: { type: String, required: true },
  amount: { type: Number, required: true },
  donationPostId: { type: mongoose.Schema.Types.ObjectId, ref: "Donation" }, // Reference to donation post
  userEmail: { type: String, required: true },
  status: { type: String, required: true }, // like "success"
  createdAt: { type: Date, default: Date.now },
});

module.exports=mongoose.model('DonationPayment',DonationPaymentSchema);
