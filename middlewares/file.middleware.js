const multer = require('multer');
const path = require('path');

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
    console.log(file);
    if (!ACCEPTED_FILES_EXTENSIONS.includes(file.mimetype)) {
        const error = new Error('invalad file type');
        error.status = 400;

        return cb(error, true);
    }
    return cb(null, true);
};


const upload = multer({
    storage,
    fileFilter,
});


module.exports = { upload };