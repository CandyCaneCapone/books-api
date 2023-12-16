const multer = require("multer");
const path = require("path");
const BadRequestError = require("../errors/bad-request");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new BadRequestError(
        "Invalid file type . only jpeg , png and gif files are allowed"
      ),
      false
    );
  }
};


const upload = multer({ storage , fileFilter , limits : {
  fileSize : 1024 * 1024 * 1 
}});

module.exports = upload;
