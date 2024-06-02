const { upload } = require("../config/multer.config");
const { Files } = require("../models");
const uploadFile = (req, res) => {
  upload.single("document")(req, res, async function (err) {
    if (err) {
      let message = err.message;
      if (!err.message) {
        message = "Upload error";
      }
      if (req.fileValidationError) {
        message = req.fileValidationError;
      }
      return res.status(500).json({
        code: 500,
        message,
      });
    } else {
      //   await File
      const { path, filename, destination } = req.file;
      const url = `${req.protocol}://${req.get("host")}/${path}`;
      const data = await Files.create({
        filename,
        type: "image",
        path,
        url,
      });
      res.status(201).json({
        code: 201,
        message: "Berhasil menambahkan data",
        data,
      });
    }
  });
};

module.exports = { uploadFile };
