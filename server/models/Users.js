const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
	email: { type: String, unique:true, lowercase:true },
	googleId: String,
	password: String
});

//use ES5 function instead. Arrow function points to global object.
userSchema.pre('save', function(next) {
	const user = this;
	bcrypt.genSalt(10, (err, salt)=>{
    	if (err) { return next(err); }
    	bcrypt.hash(user.password, salt, null, (err, hash)=>{
      		if (err) { return next(err); }
      		user.password = hash;
      		next();
    	});
  	});
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch)=>{
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

mongoose.model('users',userSchema);