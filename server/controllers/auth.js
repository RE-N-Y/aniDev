const mongoose = require('mongoose');

const User = mongoose.model('users');

exports.signup = (req, res, next) => {
  const { username, email, password } = req.body;

  User.findOne({ $or: [{ email }, { username }] }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(422).send({ error: 'email in use' });
      }
      return res.status(422).send({ error: 'username in use' });
    }

    const user = new User({ username, email, password });
    user.save((err) => {
      if (err) {
        return next(err);
      }
    });
    res.send({ signed: 'in' });
  });
};
