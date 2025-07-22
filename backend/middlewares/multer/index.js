const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudPostStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "CoverTravelPosts",
    public_id: (req, file) => {
      const baseName = file.originalname
        ? file.originalname
            .split(".")[0]
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]/g, "")
        : "image";
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e6);
      return `${baseName}-${uniqueSuffix}`;
    },
  },
});

const cloudUserAvatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Users",
    public_id: (req, file) => file.name,
  },
});

const cloudPostUpload = multer({ storage: cloudPostStorage });

const cloudUserAvatarUpload = multer({ storage: cloudUserAvatarStorage });

module.exports = { cloudPostUpload, cloudUserAvatarUpload };
