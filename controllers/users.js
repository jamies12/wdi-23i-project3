const User = require('../models/user');

function usersIndex(req, res) {
  User.find((err, users) => {
    if (err) return res.status(500).json({ error: err });
    return res.json(users);
  });
}

function usersCreate(req, res) {
  User.create(req.body, (err, user) => {
    if (err) return res.status(500).json({ error: err });
    return res.json(user);
  });
}

module.exports = {
  index: usersIndex,
  create: usersCreate
};
