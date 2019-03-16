const mongoose = require('mongoose');

const { Schema } = mongoose;

const characterSchema = new Schema({
  name: { type: String, unique: true },
  likes: { type: Number, default: 0 },
  description: String,
  thumbnail: Buffer,
  role: { type: String, enum: ['main', 'supporting'] },
  relatedCharacters: [{ type: mongoose.Schema.ObjectId, ref: 'characters' }],
  relatedAnimes: [{ type: mongoose.Schema.ObjectId, ref: 'animes' }],
});

mongoose.model('characters', characterSchema);
