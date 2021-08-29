const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

const ACCEPTED_FILES_EXTENSIONS = ['image/png', 'image/jpg', 'image/jpeg'];

const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        callback(null, fileName);
    },
    destination: (req, file, cb) => {
        const directory = path.join(__dirname, '../public/uploads');
        cb(null, directory);
    },
});

const fileFilter = (req, file, cb) => {
    // console.log(file);
    if (!ACCEPTED_FILES_EXTENSIONS.includes(file.mimetype)) {
        const error = new Error('invalid file type');
        error.status = 400;

        return cb(error, true);
    }
    return cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
});

/**
 * Subida de imágenes a Cloudinary
 */
const uploadToCloudinary = async (req, res, next) => {

    if(req.file) {

        const path = req.file.path;
  
        const avatar = await cloudinary.uploader.upload(path);
   
        req.fileUrl = avatar.secure_url;

        await fs.unlinkSync(path);

        return next();
    } else {
        
        return next();
    }
};

module.exports = { upload, uploadToCloudinary };