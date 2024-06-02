const multer = require("multer");
const path = require("path");

//storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/image");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|webp|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      req.fileValidationError = "Forbidden File";
      cb("Error: Images Only!");
    }
  },
});

module.exports = { upload };