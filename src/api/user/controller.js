const createUser = async (req, res) => {
  try {
    console.log(req.body);
    res.status(201).send('User created successfully.');
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  createUser,
};
