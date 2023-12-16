const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

const controllers = require("../controllers/books");

router
  .route("/")
  .get(controllers.getAllBooks)
  .post(upload.single("file"), controllers.createBook);
router
  .route("/:id")
  .get(controllers.getSingleBook)
  .patch(upload.single("file"), controllers.updateBook)
  .delete(controllers.deleteBook);

module.exports = router;
