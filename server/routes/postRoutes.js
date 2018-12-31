const mongoose = require('mongoose');
const CommonController = require('./../controllers/common');
const AuthController = require('./../controllers/auth');

const Post = mongoose.model('posts');
const User = mongoose.model('users');
const EditorAccess = AuthController.requireAccess(['admin', 'editor']);

const extractParam = async (object) => {
  const user = await User.findOne({ username: object.username });
  object.username = user.id;
  return object;
};

module.exports = (app) => {
  app.get('/posts/pages/:nPage', EditorAccess, CommonController.getList('posts'));
  app.post('/posts/', EditorAccess, async (req, res) => {
    const { title, content, username } = await extractParam(req.body);
    await new Post({ title, content, author: username }).save();
    res.send('Successfully posted');
  });
  app.get('/posts/:id', CommonController.getById('posts'));
  app.put(
    '/posts/:id',
    EditorAccess,
    async (req, res, next) => {
      const { title, content, username } = await extractParam(req.body);
      req.body = { title, content, author: username };
      next();
    },
    CommonController.updateById('posts'),
  );
  app.delete('/posts/:id', EditorAccess, CommonController.deleteById('posts'));
};
