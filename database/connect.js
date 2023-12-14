const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_URI);
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connect;
