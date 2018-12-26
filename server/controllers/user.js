const mongoose = require('mongoose');

const User = mongoose.model('users');

exports.getUsers = (req, res) => {
  User.find()
    .skip((req.params.nPage - 1) * 30)
    .limit(30)
    .exec((err, posts) => {
      res.send(posts);
    });
};

exports.updateAccessById = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: { access: req.body.access } }, (err) => {
    res.send('Update successful');
  });
};
