const express=require('express');
const router=express.Router();
const AluminiProfile=require('../models/alumini');
router.use(express.json());


router.get("/", async (req, res) => {
  try {
      const { name, industry, role, location, batch } = req.query;
      let query = { status: "approved" }; // Only fetch approved alumni

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




  router.put("/:id/status", async (req, res) => {
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



  router.get("/:id", async (req, res) => {
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


  module.exports=router;