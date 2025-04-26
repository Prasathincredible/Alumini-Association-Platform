const express=require('express');
const router=express.Router();
const Message=require('../models/messages');


router.get("/:user1/:user2", async (req, res) => {
    const { user1, user2 } = req.params;

    //console.log(user1+" "+user2);
  
    try {
      const messages = await Message.find({
        $or: [
          { sender: user1, receiver: user2 },
          { sender: user2, receiver: user1 },
        ],
      }).sort({ createdAt: 1 }); // Sort oldest to newest
  
      res.status(200).json(messages);
    } catch (err) {
      console.error("Error fetching messages:", err);
      res.status(500).json({ error: "Failed to get messages" });
    }
  });
  
  
  module.exports = router;