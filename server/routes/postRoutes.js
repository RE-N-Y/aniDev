const mongoose = require('mongoose');
const CommonController = require('./../controllers/common');
const AuthController = require('./../controllers/auth');

const Post = mongoose.model('posts');
const User = mongoose.model('users');
const EditorAccess = AuthController.requireAccess(['admin', 'editor']);

module.exports = (app) => {
  app.get('/posts/pages/:nPage', EditorAccess, CommonController.getList('posts'));
  app.post('/posts/', EditorAccess, (req, res) => {
    const { title, content, authorName } = req.body;
    User.findOne({ username: authorName }, (err, user) => {
      new Post({ title, content, author: user.id }).save();
      res.send('Post successful');
    });
  });
  app.get('/posts/:id', CommonController.getById('posts'));
  app.put('/posts/:id', EditorAccess, CommonController.updateById('posts'));
  app.delete('/posts/:id', EditorAccess, CommonController.deleteById('posts'));
};
