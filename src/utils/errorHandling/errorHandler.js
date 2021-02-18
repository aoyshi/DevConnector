const errorHandler = (res, err) => {
  console.log(err.message);
  res.status(500).send('Server Error');
};

module.exports = errorHandler;
