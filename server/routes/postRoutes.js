const mongoose = require('mongoose');
const Post = mongoose.model('posts');
const User = mongoose.model('users');
const PostController = require('./../controllers/post');

module.exports = (app) => {
	app.get('/posts',PostController.getPostList);
    app.post('/posts/addPost',PostController.addPost);
    app.get('/posts/:id',PostController.getPostById);
    app.put('/posts/:id',PostController.updatePostById);
    app.delete('/posts/:id',PostController.deletePostById);
}
