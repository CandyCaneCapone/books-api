const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    trim: true,
    minLength: 3,
    maxLength: 100,
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    trim: true,
    maxLength: 300,
  },
  imagePath: {
    type: String,
  },
  author: {
    type: String,
    required: [true, "Please provide an author"],
    trim: true,
    maxLength: 100,
  },
});

module.exports = mongoose.model("books", bookSchema);
