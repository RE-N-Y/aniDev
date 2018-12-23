const mongoose = require('mongoose');

const { Schema } = mongoose;

const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  username: { type: String },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    sparse: true,
    trim: true,
  },
  googleId: { type: String, unique: true, sparse: true },
  password: String,
  access: String,
});

userSchema.pre('save', function (next) {
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      user.access = 'member';
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

mongoose.model('users', userSchema);
