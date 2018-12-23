const passport = require('passport');
const AuthController = require('./../controllers/auth');

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
};
