const mongoose = require('mongoose');

const { Schema } = mongoose;

const studioSchema = new Schema({
  name: { type: String, unique: true },
  logo: Buffer,
  review: String,
  relatedAnimes: [{ type: mongoose.Schema.ObjectId, ref: 'animes' }],
});

mongoose.model('studios', studioSchema);
