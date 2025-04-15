const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  userName: {
     type: String, required: true 
    },
  email: {
     type: String, 
     required: true, 
     unique: true
     },
     password:{
      type:String,
      required:true
     },
  rollNo: { 
    type: String, 
    required: true,
     unique: true
     },
  batch: { 
    type: String,
     required: true
     }, 
  degree: { 
    type: String, 
    required: true
 }, 
  department: {
     type: String,
      required: true
     }, 
  year: { 
    type: Number,
     required: true
     }, 
    role: {
     type: String,
      enum: ["student", "alumni"], 
      default: "student"
     },
  appliedJobs: [{ 
    type: mongoose.Schema.Types.ObjectId,
     ref: "Job" }], 
  avatar: {
     type: String, 
     default: ""
     }, 
  connectedAlumni: [{
     type: mongoose.Schema.Types.ObjectId,
      ref: "Alumni" 
    }], 
}, { timestamps: true });

module.exports = mongoose.model("Student", StudentSchema);
