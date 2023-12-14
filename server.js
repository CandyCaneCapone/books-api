const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const booksRouter = require("./routes/books");
const connect = require("./database/connect");
const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error-handler");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/books" , booksRouter);

connect();

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
