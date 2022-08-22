require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const multer = require("multer");
const { v4: uuid } = require("uuid");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRETE,
});

const storage = multer.diskStorage({
  destination: "./images",
  filename(req, file, cb) {
    const newFileName = `${uuid()}-${file.originalname}`;
    cb(null, newFileName);
  },
});

// 3rd process...
const uploaddImgFile = multer({
  storage,
}).single("image");

const uploaddImgToCloudinary = async (filename) => {
  try {
    console.log("reached", filename);
    const uploadResponse = await cloudinary.uploader.upload(filename, {
      upload_preset: "black_box",
    });
    console.log(uploadResponse);
    return uploadResponse;
  } catch (err) {
    return err.message;
  }
};

module.exports = { cloudinary, uploaddImgFile, uploaddImgToCloudinary };
