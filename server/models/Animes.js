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
  story: { type: Number, default: 0 },
  art: { type: Number, default: 0 },
  character: { type: Number, default: 0 },
  music: { type: Number, default: 0 },
});

mongoose.model('animes', animeSchema);
