const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");
require("dotenv").config();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "final_year_project_images", // Change to your Cloudinary folder name
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

module.exports = upload;
