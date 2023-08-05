const multer = require('multer');
const path = require("path")

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/public/images')); // Specify the destination directory for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + '-' + file.originalname); // Define the file naming convention
    },
  }),
  fileFilter: function (req, file, cb) {
    // Validate file types (e.g., accept only image files)
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed.'));
    }
  },
});

module.exports = upload;