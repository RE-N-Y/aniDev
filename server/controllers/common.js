const mongoose = require('mongoose');

const Post = mongoose.model('posts');

const User = mongoose.model('users');

const Anime = mongoose.model('animes');

const Character = mongoose.model('characters');

const chooseModel = (model) => {
  switch (model) {
    case 'users':
      return User;
    case 'animes':
      return Anime;
    case 'characters':
      return Character;
    case 'posts':
      return Post;
  }
};

exports.getList = (model) => {
  const middleware = (req, res) => {
    const DB = chooseModel(model);
    DB.find()
      .skip((req.params.nPage - 1) * 30)
      .limit(30)
      .exec((err, items) => {
        res.send(items);
      });
  };
  return middleware;
};

exports.getById = (model) => {
  const middleware = (req, res) => {
    const DB = chooseModel(model);
    DB.findById(req.params.id, (err, item) => {
      res.send(item);
    });
  };
  return middleware;
};

exports.updateById = (model) => {
  const middleware = (req, res) => {
    const DB = chooseModel(model);
    DB.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
      res.send('Update successful');
    });
  };
  return middleware;
};

exports.deleteById = (model) => {
  const middleware = (req, res) => {
    const DB = chooseModel(model);
    DB.findByIdAndDelete(req.params.id, (err) => {
      res.send('Deleted Successfully');
    });
  };
  return middleware;
};
