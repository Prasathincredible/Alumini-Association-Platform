const express=require('express');
const router=express.Router();
const Message=require('../models/messages');
const Conversation=require('../models/conversation');

router.post("/", async (req, res) => {
    const { sender, receiver, text, file } = req.body;
  
    try {
      const newMessage = new Message({
        sender,
        receiver,
        text,
        file,
      });
  
      const savedMessage = await newMessage.save();
      console.log(savedMessage);
  
      // Update the conversation's lastMessage and timestamp
      await Conversation.findOneAndUpdate(
        {
          $or: [
            { sender, receiver },
            { sender: receiver, receiver: sender },
          ],
        },
        {
          lastMessage: text,
          timestamp: new Date(),
        }
      );
  
      res.status(200).json(savedMessage);
    } catch (err) {
      console.error("Error saving message:", err);
      res.status(500).json({ error: "Failed to send message" });
    }
  });


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