const express=require('express');
const mongoose=require('mongoose');
const AluminiProfile=require('./models/alumini');
const AdminProfile=require('./models/admin');
const Job=require('../backend/models/job');
const authenticateToken=require('./middlewares/authenticateToken');
const Razorpay = require("razorpay");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app=express();
require("dotenv").config();
const cors=require('cors');
const upload=require('./config/multer');



mongoose.connect('mongodb://127.0.0.1:27017/alumini')
const db=mongoose.connection;
db.on('error',(error)=> console.error(error));
db.once('open',()=> console.log('Mongodb connected'));

app.use(cors());
app.use(express.json());




app.post("/signup", upload.fields([{ name: "avatar" }, { name: "marksheet" }]), async (req, res) => {
  try {
    const { userName, email, password, batch, department, industry, company, position, phone, linkedin, github } = req.body;

    console.log(userName);
    const avatar = req.files["avatar"] ? req.files["avatar"][0].path : null;
    const marksheet = req.files["marksheet"] ? req.files["marksheet"][0].path : null;

    if (!marksheet) return res.status(400).json({ message: "Marksheet is required!" });

    // Check if user already exists
    const existingUser = await AluminiProfile.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const newUser = new AluminiProfile({
      userName,
      email,
      password: hashedPassword,
      batch,
      department,
      industry,
      company,
      position,
      phone,
      linkedin,
      github,
      avatar,
      marksheet,
      status: "pending", // Default status is pending
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully! Waiting for admin approval.", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


  app.post("/login", async (req, res) => {
    const { userName, password } = req.body;

   //console.log(userName+password);
  
    try {
      let user = await AdminProfile.findOne({name:userName });
      let role="admin";
  
      if (!user) {
        user=await AluminiProfile.findOne({userName});
        role="user";
      }

      if(!user){
        return res.status(400).json({message:"User not found"});
      }

      //console.log(role);
  
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ id: user._id, userName:userName,role }, process.env.JWT_SECRET);
      res.json({ message: "User logged in successfully", token, user,role });

    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" });
    }
  });


  app.get('/profile',authenticateToken, async(req,res)=>{
    try
    {
        const userName=await AluminiProfile.findOne({userName:req.user.userName})
        //console.log(userName);
        if(!userName)
        {
            return res.status(404).json({message:"User not found"});
        }
       res.json(userName);
    }catch(error)
    {
       res.status(401).json({message:"Unauthorised"}); 
    }
});


app.get("/profile/:userName", async (req, res) => {
  try {
    const { userName } = req.params;
    const user = await AluminiProfile.findOne({userName:userName}).select("-password"); // Exclude password from response

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user);
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error" });
  }
});


app.get("/alumni", async (req, res) => {
  try {
    const { name, industry, role, location, batch } = req.query;
    let query = {};

    if (name) query.userName = { $regex: name, $options: "i" };
    if (industry) query.industry = industry;
    if (role) query.role = role;
    if (location) query.location = location;
    if (batch) query.batch = batch;

    const alumni = await AluminiProfile.find(query);
    res.json(alumni);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});


app.post("/donate", async (req, res) => {
  try {
  
    console.log(req.body);

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100, // Convert to paise
      currency: req.body.currency || "INR",
      receipt: `receipt_${Date.now()}`,
    };

    if (!razorpay.orders.create) {
      throw new Error("razorpay.orders.create is not a function");
    }

    const donation = await razorpay.orders.create(options);
    console.log("Donation Order Response:", donation); // Debugging Log
    res.json(donation);
    
  } catch (error) {
    console.error("Razorpay Error:", error); // Log Razorpay error
    res.status(500).json({ error: error.message });
  }
});

app.post("/postjobs", async(req, res)=>{
  try{
    const {title, companyName, location, jobType, skillsRequired, salary, description,deadline,postedBy, postedByName}=req.body;

    if(!title || !companyName || !location || !description || !deadline){
      return res.status(400).json({message: "Please fill in all required fields"});
    }

    const newJob=new Job({
      title,
      companyName,
      location,
      jobType,
      skillsRequired,
      salary,
      description,
      deadline,
      postedBy,
      postedByName
    });

    await newJob.save();

    res.status(201).json({message: "Job Posted successfully", job:newJob});
  }catch(error){
    console.error("Error posting job:", error);
    res.status(500).json({message:"Server error"});
  }
});


app.get("/jobs", async(req,res)=>{
  try{
    const jobs=await Job.find();
    res.json(jobs);
  }catch(error){
    res.status(500).json({error: "Error fetching jobs"});
  }
});


app.get("/jobs/:id", async(req,res)=>{
  try{
    const job=await Job.findById(req.params.id);

    if(!job) return res.status(404).json({error:"Job not found"});
    res.json(job);
  }catch(error){
    res.status(500).json({error:"Error fetching job details"});
  }
});


app.post("/apply", async (req, res) => {
  try {
    const { jobId, userId, userName } = req.body;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Ensure uniqueness before adding
    if (job.appliedUsers.some(user => user.userId.toString() === userId)) {
      return res.status(400).json({ error: "User already applied" });
    }

    job.appliedUsers.push({ userId, userName });
    await job.save();

    res.json({ message: "Successfully applied", appliedUsers: job.appliedUsers });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});





app.get("/job/:jobId/applied-users", async (req, res) => {
  try {
    const { jobId } = req.params;
    const { userId } = req.query; // Get the current logged-in user ID

    //console.log(jobId+" "+userId);

    const job = await Job.findById(jobId);

    if (!job) return res.status(404).json({ error: "Job not found" });

    // Check if the logged-in user is the one who posted the job
    if (job.postedBy.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    // Return the applied users
    res.status(200).json({ appliedUsers: job.appliedUsers });
  } catch (error) {
    res.status(500).json({ error: "Error fetching applied users" });
  }
});


app.get("/admin/pending-alumni", async (req, res) => {
  const pendingAlumni = await AluminiProfile.find({ status: "pending" });
  res.json(pendingAlumni);
});


app.put("/alumni/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedAlumni = await AluminiProfile.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedAlumni) {
      return res.status(404).json({ message: "Alumni not found" });
    }

    res.json({ message: `Alumni has been ${status}`, alumni: updatedAlumni });
  } catch (error) {
    console.error("Error updating alumni status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




app.get("/alumni/:id", async (req, res) => {
  try {
    const alumni = await AluminiProfile.findById(req.params.id);
    if (!alumni) {
      return res.status(404).json({ message: "Alumni not found" });
    }
    res.json(alumni);
  } catch (error) {
    console.error("Error fetching alumni details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});








app.use(authenticateToken);

app.listen(3000,()=>{
    console.log("server connected");
})