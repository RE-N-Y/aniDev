const mongoose = require('mongoose');

const Post = mongoose.model('posts');

const User = mongoose.model('users');

const Anime = mongoose.model('animes');

const Character = mongoose.model('characters');

const Studio = mongoose.model('studios');

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
    case 'studios':
      return Studio;
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

exports.getAll = (model) => {
  const middleware = (req, res) => {
    const DB = chooseModel(model);
    DB.find().exec((err, items) => {
      const name = model === 'animes' ? 'title' : 'name';
      res.send(items.map(item => item[name]));
    });
  };
  return middleware;
};

exports.search = (model) => {
  const middleware = (req, res) => {
    const DB = chooseModel(model);
    const name = model === 'animes' ? 'title' : 'name';
    DB.find({ [name]: { $regex: req.params.search, $options: 'i' } }, (err, items) => {
      res.send(items.map(item => item[name]));
    });
  };
  return middleware;
};

exports.getFullDocById = (model, fields) => {
  const middleware = (req, res) => {
    const DB = chooseModel(model);
    DB.findById(req.params.id)
      .populate({ path: 'relatedAnimes', select: fields })
      .populate({ path: 'relatedCharacters', select: fields })
      .populate({ path: 'relatedStudios', select: fields })
      .exec((err, item) => {
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
