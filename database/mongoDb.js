const mongoose = require('mongoose');
require('dotenv').config();

const dbUri = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Successfully connected to MongoDB!');
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDb;
