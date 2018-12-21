const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.ObjectId, ref: 'users' },
  written: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
});

mongoose.model('posts', postSchema);
