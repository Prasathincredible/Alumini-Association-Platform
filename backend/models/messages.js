const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    file: {
      type: String, // URL of the uploaded file (for future file sharing)
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
