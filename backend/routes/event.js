const express=require('express');
const Event=require('../models/event');
const router=express.Router();
const upload=require('../config/multer');


router.post("/create",upload.single("media"), async (req, res) => {
    try {
      const { title, description, date,time, venue } = req.body;
      console.log(title);
      const mediaUrl = req.file ? req.file.path : "";
      const event = new Event({
        title,
        description,
        date,
        time,
        venue,
        media: mediaUrl,
      });
  
      await event.save();
      res.status(201).json({ message: "Event created successfully", event });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });



  router.get("/events", async (req, res) => {
    try {
      const events = await Event.find(); // Fetch all events from DB
      res.json(events);
    } catch (err) {
      res.status(500).json({ message: "Error fetching events" });
    }
  });
  


  module.exports=router;
