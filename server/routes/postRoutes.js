const mongoose = require('mongoose');
const CommonController = require('./../controllers/common');
const AuthController = require('./../controllers/auth');

const Post = mongoose.model('posts');
const User = mongoose.model('users');
const EditorAccess = AuthController.requireAccess(['admin', 'editor']);

module.exports = (app) => {
  app.get('/posts/pages/:nPage', EditorAccess, CommonController.getList('posts'));
  app.post('/posts/', EditorAccess, async (req, res) => {
    const { title, content } = req.body;
    await new Post({ title, content, author: req.user.id }).save();
    res.send('Successfully posted');
  });
  app.get('/posts/:id', CommonController.getById('posts'));
  app.put(
    '/posts/:id',
    EditorAccess,
    (req, res, next) => {
      const { title, content } = req.body;
      req.body = { title, content, author: req.user.id };
      next();
    },
    CommonController.updateById('posts'),
  );
  app.delete('/posts/:id', EditorAccess, CommonController.deleteById('posts'));
};
