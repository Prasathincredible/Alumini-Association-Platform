const express=require('express');
const router=express.Router();
const Donation=require('../models/donation');
const upload=require('../config/multer');

router.post('/upload', upload.single('media'), async (req, res) => {
    try {
      const { caption } = req.body;
      if (!req.file) {
        return res.status(400).json({ message: 'No media file uploaded.' });
      }
  
      const mediaUrl = `${req.file.path}`; // Adjust if you host files elsewhere
      const mediaType = req.file.mimetype.startsWith('video') ? 'video' : 'image';
  
      const donation = new Donation({
        caption,
        mediaUrl,
        mediaType,
      });
  
      await donation.save();
  
      res.status(201).json({ message: 'Donation post uploaded successfully.', donation });
    } catch (error) {
      console.error('Error uploading donation:', error);
      res.status(500).json({ message: 'Server error. Try again.' });
    }
  });


  router.get('/all', async (req, res) => {
    try {
      const donations = await Donation.find().sort({ createdAt: -1 }); // latest first
      res.status(200).json(donations);
    } catch (error) {
      console.error('Error fetching donations:', error);
      res.status(500).json({ message: 'Server error. Try again later.' });
    }
  });

  
  
  module.exports = router;
