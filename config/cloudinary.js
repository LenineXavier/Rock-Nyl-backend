const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Não esquecer de criar as variáveis de ambiente no .env com as chaves da API do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "RockNyl",
    format: async (req, file) => "png",
    use_filename: true,
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
