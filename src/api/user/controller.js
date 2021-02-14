const createUser = async (req, res) => {
  try {
    console.log(req.body);
    res.send('User route from controller');

  } catch(err) {
    res.send(err);
  }
};

module.exports = {
  createUser, 
};
