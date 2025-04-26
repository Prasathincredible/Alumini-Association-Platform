const express=require('express');
const router=express.Router();
const cloudinary=require('cloudinary').v2;


router.post('/generate-signature', (req, res) => {
    const timestamp = Math.round(new Date().getTime() / 1000);
  
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, upload_preset:"ml_default" },
      process.env.CLOUDINARY_API_SECRET
    );
  
    res.json({ timestamp, signature });
  });

module.exports=router;