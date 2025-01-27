import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';  // Correct import path with .js extension
// Import your cloudinary configuration

// Set up storage engine for Cloudinary using multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'user_profiles',  // Directory/folder in Cloudinary to store images
    allowedFormats: ['jpg', 'jpeg', 'png', 'gif'],  // Allow only these formats
  },
});

// Create multer instance with Cloudinary storage
const upload = multer({ storage: storage });

export default upload;
