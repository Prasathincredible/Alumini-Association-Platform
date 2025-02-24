const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  media: {
    type: String,
    default: "",
  },
  postedby:{
     type: mongoose.Schema.Types.ObjectId,
     ref:"AdminProfile",
     //required:true
  }
}, { timestamps: true });

module.exports = mongoose.model("Event", EventSchema);
