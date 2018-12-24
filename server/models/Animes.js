const mongoose = require('mongoose');

const { Schema } = mongoose;

const animeSchema = new Schema({
  title: String,
  rating: Number,
  likes: Number,
  mainImage: String,
  thumbNail: String,
  synopsis: String,
  review: String,
  startedAiring: Date,
  finishedAiring: Date,
  relatedCharacters: [{ type: mongoose.Schema.ObjectId, ref: 'characters' }],
  relatedAnimes: [{ type: mongoose.Schema.ObjectId, ref: 'animes' }],
});

mongoose.model('animes', animeSchema);
