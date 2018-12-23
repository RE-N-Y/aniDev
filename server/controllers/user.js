const mongoose = require('mongoose');

const User = mongoose.model('users');

exports.getUsers = (req, res) => {
  User.find({}, (err, users) => {
    res.send(users);
  });
};

exports.updateAccessById = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: { access: req.body.access } }, (err) => {
    res.send('Update successful');
  });
};
