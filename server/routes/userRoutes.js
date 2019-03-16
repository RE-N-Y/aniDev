const mongoose = require('mongoose');
const AdminAccess = require('./../controllers/auth').requireAccess(['admin']);
const CommonController = require('./../controllers/common');

const User = mongoose.model('users');

module.exports = (app) => {
  app.get('/users/pages/:nPage', AdminAccess, CommonController.getList('users'));
  app.put(
    '/users/:id',
    AdminAccess,
    (req, res, next) => {
      const { username, access } = req.body;
      if (!['member', 'editor', 'admin'].includes(access)) access = 'member';
      req.body = { username, access };
      next();
    },
    CommonController.updateById('users'),
  );
  app.get('/users/:id', CommonController.getById('users'));

  app.post('/favorite/:type/:id/:action', async (req, res) => {
    const { type, id, action } = req.params;
    if (type === 'animes') {
      await User.findByIdAndUpdate(req.user.id, { [action]: { favoriteAnimes: id } }, (err) => {
        if (err) {
          res.send('Error occured in updating field');
        } else {
          res.send('Successfully updated favoriteAnimes');
        }
      });
    } else if (type === 'characters') {
      await User.findByIdAndUpdate(req.user.id, { [action]: { favoriteCharacters: id } }, (err) => {
        if (err) {
          res.send('Error occured in updating field');
        } else {
          res.send('Successfully updated favoriteCharacters');
        }
      });
    } else {
      res.send('Invalid type');
    }
  });
};
