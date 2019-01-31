const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const AuthController = require('./../controllers/auth');

const User = mongoose.model('users');
const keys = require('./../config/keys');

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),
  );
  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('http://localhost:3000/');
  });
  app.post('/signup', AuthController.signup);
  app.post('/signin', passport.authenticate('local'), (req, res) => {
    res.send({ logged: 'in' });
  });
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000/');
  });
  app.get('/profile', (req, res) => {
    const { id, access, username } = req.user;
    res.send({ id, access, username });
  });

  app.post('/forgot', (req, res, next) => {
    const generateToken = () => new Promise((resolve, reject) => {
      crypto.randomBytes(20, (err, buf) => {
        if (err) {
          reject(err);
        }
        const token = buf.toString('hex');
        resolve(token);
      });
    });
    const findUser = token => new Promise((resolve, reject) => {
      User.findOneAndUpdate(
        { email: req.body.email },
        { $set: { resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 } },
        { new: true },
        (err, user) => {
          if (err) {
            reject(err);
            res.send('Error finding user');
          }
          resolve({ user, token });
        },
      );
    });
    const sendMail = ({ user, token }) => new Promise((resolve, reject) => {
      const mailer = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: keys.mailingId,
          pass: keys.mailingPassword,
        },
      });
      const options = {
        to: user.email,
        from: 'passwordreset@anipin.ai',
        subject: 'Password Reset',
        text: `http://${req.headers.host}/reset/${token}`,
      };
      mailer.sendMail(options, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
        res.send('Successfully sent mail to user');
      });
    });
    generateToken()
      .then(token => findUser(token))
      .then((user, token) => sendMail(user, token));
  });

  app.post('/reset/:token', (req, res) => {
    User.findOne(
      { resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } },
      (err, user) => {
        if (!user) {
          res.send('No user found');
        }
        user.password = req.body.password;
        user.resetPasswordExpires = undefined;
        user.resetPasswordToken = undefined;
        user.save();
        res.send('Successfully updated user password');
      },
    );
  });
};
