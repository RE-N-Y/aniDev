const mongoose = require('mongoose');

const Post = mongoose.model('posts');

const User = mongoose.model('users');

exports.getPostList = (req, res) => {
  Post.find()
    .skip((req.params.nPage - 1) * 30)
    .limit(30)
    .exec((err, posts) => {
      res.send(posts);
    });
};

exports.addPost = (req, res) => {
  const { title, content, authorName } = req.body;
  User.findOne({ username: authorName }, (err, user) => {
    new Post({ title, content, author: user.id }).save();
    res.send('Post successful');
  });
};

exports.getPostById = (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    res.send(post);
  });
};

exports.updatePostById = (req, res) => {
  Post.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
    res.send('Update successful');
  });
};

exports.deletePostById = (req, res) => {
  Post.findByIdAndDelete(req.params.id, (err) => {
    res.send('Deleted Successfully');
  });
};
