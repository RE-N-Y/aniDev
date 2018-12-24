const mongoose = require('mongoose');

const { Schema } = mongoose;

const characterSchema = new Schema({
  name: String,
  likes: Number,
  description: String,
  thumbnail: String,
  relatedCharacters: [{ type: mongoose.Schema.ObjectId, ref: 'characters' }],
  relatedAnimes: [{ type: mongoose.Schema.ObjectId, ref: 'animes' }],
});

mongoose.model('characters', characterSchema);
