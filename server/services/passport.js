const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./../config/keys');
const LocalStrategy = require('passport-local');

const User = mongoose.model('users');

passport.serializeUser((user,done)=>{
  done(null,user.id);
});

passport.deserializeUser((id,done)=>{
  User.findById(id)
    .then(user=>{
      done(null,user);
    })
});

const googleStrategy = new GoogleStrategy({
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	},(accessToken,refreshToken,profile,done)=>{
		User.findOne({googleId:profile.id})
			.then(existingUser=>{
				if(existingUser) {
					done(null,existingUser);
				} else {
					new User({googleId:profile.id})
						.save()
						.then(user => done(null,user))
				}
		});
});

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done)=>{
  User.findOne({ email }, (err, user)=>{
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    user.comparePassword(password, (err, isMatch)=>{
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });
  });
});

passport.use(googleStrategy);
passport.use(localLogin);