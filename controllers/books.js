const Books = require("../models/book");
const fs = require("fs").promises;
const NotFoundError = require("../errors/not-found");

const createBook = async (req, res, next) => {
  req.body.imagePath = req.file.path;
  try {
    await Books.create({ ...req.body });
    res.status(201).json({ message: "book created" });
  } catch (error) {
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (error) {
        console.log(
          `Error while unlinking old image for book with id ${bookId}:`,
          error
        );
      }
    }
    next(error);
  }
};

const getAllBooks = async (req, res, next) => {
  try {
    const books = await Books.find({});
    res.json(books);
  } catch (error) {
    next(error);
  }
};
const getSingleBook = async (req, res, next) => {
  const bookId = req.params.id;
  try {
    const book = await Books.findById(bookId);
    if (!book) {
      throw new NotFoundError(`no book found with id ${bookId}`);
    }

    res.json(book);
  } catch (error) {
    next(error);
  }
};



const updateBook = async (req, res, next) => {
  const bookId = req.params.id;

  try {
    const book = await Books.findById(bookId);

    if (!book) {
      throw new NotFoundError(`no book found with id ${bookId}`);
    }

    if (req.file && req.file.path) {
      try {
        await fs.unlink(book.imagePath);
      } catch (error) {
        console.log(
          `Error while unlinking old image for book with id ${bookId}:`,
          error
        );
      }
    }
    req.body.imagePath = req.file?.path;

    const newBook = await Books.findByIdAndUpdate(bookId, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(newBook);
  } catch (error) {
    if (req.file && req.file.path) {
      try {
        await fs.unlink(req.file.path);
      } catch (error) {
        console.log(
          `Error while unlinking new image for book with id ${bookId}:`,
          error
        );
      }
    }
    next(error);
  }
};
const deleteBook = async (req, res, next) => {
  const bookId = req.params.id;
  try {
    const book = await Books.findByIdAndDelete(bookId);
    if (!book) {
      throw new NotFoundError(`no book found with id ${bookId}`);
    }

    if (book.imagePath) {
      try {
        await fs.unlink(book.imagePath);
      } catch (error) {
        console.log(
          `Error while unlinking image for book with id ${bookId}:`,
          error
        );
      }
    }

    res.json(book)
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
