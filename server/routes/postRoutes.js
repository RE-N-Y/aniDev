const mongoose = require('mongoose');
const CommonController = require('./../controllers/common');
const AuthController = require('./../controllers/auth');

const Post = mongoose.model('posts');
const User = mongoose.model('users');
const EditorAccess = AuthController.requireAccess(['admin', 'editor']);

const extractParam = (object) => {
  const { title, content, authorName } = object;
  User.findOne({ username: authorName }, (err, user) => ({ title, content, author: user.id }));
};

module.exports = (app) => {
  app.get('/posts/pages/:nPage', EditorAccess, CommonController.getList('posts'));
  app.post('/posts/', EditorAccess, (req, res) => {
    new Post(extractParam(req.body));
    res.send('Successfully posted');
  });
  app.get('/posts/:id', CommonController.getById('posts'));
  app.put(
    '/posts/:id',
    EditorAccess,
    (req, res, next) => {
      req.body = extractParam(req.body);
      next();
    },
    CommonController.updateById('posts'),
  );
  app.delete('/posts/:id', EditorAccess, CommonController.deleteById('posts'));
};
