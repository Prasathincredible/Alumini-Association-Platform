const express=require('express');
const mongoose=require('mongoose');
const AluminiProfile=require('./models/alumini');
const AdminProfile=require('./models/admin');
const Student=require('../backend/models/student');
const authenticateToken=require('./middlewares/authenticateToken');
const jobRoutes=require('./routes/jobRoutes');
const aluminiRoutes=require('./routes/aluminiRoutes');
const eventRoutes=require('./routes/event');
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

    //console.log(userName);
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



app.post("/students/signup", upload.single("avatar"), async (req, res) => {
  try {
    const { name, email, rollNo, batch, degree, department, year, password } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarUrl = req.file ? req.file.path : "";
    const newStudent = new Student({
      name,
      email,
      rollNo,
      batch,
      degree,
      department,
      year,
      avatar: avatarUrl, // Store Cloudinary URL in database
      role: "student",
      password: hashedPassword,
    });

    await newStudent.save();
    res.status(201).json({ message: "Student registered successfully!", student: newStudent });
  } catch (error) {
    console.error("Error signing up student:", error);
    res.status(500).json({ message: "Server error, please try again!" });
  }
});


app.post("/login", async (req, res) => {
  const { userInput, password } = req.body;  // userInput instead of email and userName

  try {
    let user;
    let role;

    // Check if the userInput is an email or username
    if (userInput.includes('@')) {
      // If it's an email, check against AlumniProfile and Student models
      user = await AluminiProfile.findOne({ email: userInput });
      if (user) {
        role = "user"; // Alumni role
      } else {
        user = await Student.findOne({ email: userInput });
        if (user) {
          role = "student";
        }
      }
    } else {
      // If it's a username, check against AdminProfile
      user = await AdminProfile.findOne({ name: userInput });
      if (user) {
        role = "admin";
      }
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (role === "user" && user.status !== "approved") {
      return res.status(403).json({ message: "Your account is pending approval." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, email: user.email, role }, process.env.JWT_SECRET);

    res.json({ message: "User logged in successfully", token, user, role });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

  app.get('/profile',authenticateToken, async(req,res)=>{
    try
    {
        const email=await AluminiProfile.findOne({email:req.user.email})
        //console.log(userName);
        if(!email)
        {
            return res.status(404).json({message:"User not found"});
        }
       res.json(email);
    }catch(error)
    {
       res.status(401).json({message:"Unauthorised"}); 
    }
});


app.get('/student_profile', authenticateToken, async (req, res) => {
  try {
    const student = await Student.findOne({email:req.user.email}).select('-password -role -appliedJobs -connectedAlumni');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student); // Send student profile data
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get("/profile/:userName", async (req, res) => {
  try {
    const { userName } = req.params;
    const user = await AluminiProfile.findOne({userName:userName}).select("-password"); // Exclude password from response

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //console.log(user);
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error" });
  }
});


app.post("/donate", async (req, res) => {
  try {
  
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



app.get("/admin/pending-alumni", async (req, res) => {
  const pendingAlumni = await AluminiProfile.find({ status: "pending" });
  res.json(pendingAlumni);
});


app.use('/job', jobRoutes);
app.use('/alumni',aluminiRoutes);
app.use('/event',eventRoutes);
app.use(authenticateToken);


app.listen(3000,()=>{
    console.log("server connected");
})