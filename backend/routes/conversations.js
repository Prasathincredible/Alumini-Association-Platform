const express=require('express');
const router=express.Router();
const Message=require('../models/messages');
const Conversation=require('../models/conversation');
router.use(express.json());

router.post("/", async(req, res) => {
    const { sender, receiver } = req.body;
    //console.log(sender+" "+receiver);
  
    try {
      // Check if conversation already exists
      let conversation = await Conversation.findOne({
        $or: [
          { sender, receiver },
          { sender: receiver, receiver: sender },
        ],
      });
  
      // If not, create a new one
      if (!conversation) {
        conversation = new Conversation({ 
            sender,
            receiver,
            lastMessage: "", 
            timestamp: new Date() 
        });
      }
      await conversation.save();
      //console.log(conversation);
      res.status(200).json(conversation);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  });


router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    //console.log(userId);

    const conversations = await Conversation.find({
      $or: [
        { sender: userId },
        { receiver: userId }
      ]
    }).sort({ timestamp: -1 });

    res.status(200).json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ error: "Failed to get conversations" });
  }
});


  module.exports=router;
  

