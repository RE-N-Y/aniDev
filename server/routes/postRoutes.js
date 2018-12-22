const PostController = require('./../controllers/post');
const AuthController = require('./../controllers/auth');

const EditorAccess = AuthController.requireAccess(['admin', 'editor']);

module.exports = (app) => {
  app.get('/posts', EditorAccess, PostController.getPostList);
  app.post('/posts/addPost', EditorAccess, PostController.addPost);
  app.get('/posts/:id', PostController.getPostById);
  app.put('/posts/:id', EditorAccess, PostController.updatePostById);
  app.delete('/posts/:id', EditorAccess, PostController.deletePostById);
};
