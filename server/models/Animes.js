const mongoose = require('mongoose');

const { Schema } = mongoose;

const animeSchema = new Schema({
  title: String,
  rating: Number,
  likes: { type: Number, default: 0 },
  mainImage: Buffer,
  thumbnail: Buffer,
  synopsis: String,
  review: String,
  startedAiring: Date,
  finishedAiring: Date,
  genres: [{ type: String }],
  relatedCharacters: [{ type: mongoose.Schema.ObjectId, ref: 'characters' }],
  relatedAnimes: [{ type: mongoose.Schema.ObjectId, ref: 'animes' }],
  relatedStudios: [{ type: mongoose.Schema.ObjectId, ref: 'studios' }],
});

mongoose.model('animes', animeSchema);
