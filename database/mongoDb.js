const mongoose = require('mongoose');
const config = require('config');

const dbUri = config.get('mongoURI');

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
