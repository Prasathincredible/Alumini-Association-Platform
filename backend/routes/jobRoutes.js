const express=require('express');
const Job=require('../models/job');
const router=express.Router();
router.use(express.json())

router.post("/postjobs", async(req, res)=>{
    try{
      const {title, companyName, location, jobType, skillsRequired, salary, description,deadline, companyWebsite, postedBy, postedByName}=req.body;
  
      console.log(title);
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
        companyWebsite,
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

  router.get("/jobs", async (req, res) => {
    try {
      const jobs = await Job.find({ status: "approved" }); // Filter only approved jobs
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: "Error fetching jobs" });
    }
  });


  router.get("/jobs/:id", async(req,res)=>{
    try{
      
      const job=await Job.findById(req.params.id);
      if(!job) return res.status(404).json({error:"Job not found"});
      res.json(job);
    }catch(error){
      res.status(500).json({error:"Error fetching job details"});
    }
  });


  router.post("/apply", async (req, res) => {
    try {
      const { jobId, userId, userName } = req.body;
  
      const job = await Job.findById(jobId);
  
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }
  
      if (job.appliedUsers.some(user => user.userId.toString() === userId)) {
        return res.status(400).json({ error: "User already applied" });
      }
      job.appliedUsers.push({userId, userName});
      await job.save();
  
      res.json({ message: "Successfully applied", appliedUsers: job.appliedUsers });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });


router.get("/job/:jobId/applied-users", async (req, res) => {
    try {
      const { jobId } = req.params;
      const { userId } = req.query; // Get the current logged-in user ID
  
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


  router.get("/pending-jobs", async (req, res) => {
    try {
  
      const pendingJobs = await Job.find({ status: "pending" });
      res.status(200).json(pendingJobs);
    } catch (error) {
      res.status(500).json({ message: "Error fetching pending jobs", error });
    }
  });


  router.get("/approved-jobs", async (req, res) => {
    try {
      const approvedJobs = await Job.find({ status: "approved" });
      res.status(200).json(approvedJobs);
    } catch (error) {
      res.status(500).json({ message: "Error fetching approved jobs", error });
    }
  });


  router.put("/approve-job/:id", async (req, res) => {
    try {
      const job = await Job.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
      if (!job) return res.status(404).json({ message: "Job not found" });
      res.status(200).json({ message: "Job approved successfully", job });
    } catch (error) {
      res.status(500).json({ message: "Error approving job", error });
    }
  });


  router.delete("/delete-job/:id", async (req, res) => {
    try {
      const job = await Job.findByIdAndDelete(req.params.id);
      if (!job) return res.status(404).json({ message: "Job not found" });
      res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting job", error });
    }
  });
  


  module.exports=router
  
  