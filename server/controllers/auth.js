const mongoose = require('mongoose');

const User = mongoose.model('users');

exports.signup = (req, res, next) => {
  const { username, email, password } = req.body;

  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.status(422).send({ error: 'email in use' });
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

exports.requireAccess = (roles) => {
  const accessControl = (req, res, next) => {
    if (!roles.includes(req.user.access)) {
      res.status(403).send({ error: 'Access denied' });
    } else {
      next();
    }
  };
  return accessControl;
};
