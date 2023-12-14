const express = require("express");
const router = express.Router();

const controllers = require("../controllers/books");

router.route("/").get(controllers.getAllBooks).post(controllers.createBook);
router
  .route("/:id")
  .get(controllers.getSingleBook)
  .patch(controllers.updateBook)
  .delete(controllers.deleteBook);

module.exports = router;
