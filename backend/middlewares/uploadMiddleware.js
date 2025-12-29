const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(
                file.originalname
            ).toLowerCase()}`
        );
    },
});

// Check file type
function checkFileType(file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    }

    cb(new Error("Only image files are allowed"));
}

// Initialize upload
const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
}).single("coverImage");

module.exports = upload;