const UserController = require('./../controllers/user');
const AdminAccess = require('./../controllers/auth').requireAccess(['admin']);

module.exports = (app) => {
  app.get('/users/:nPage', AdminAccess, UserController.getUsers);
  app.put('/user/:id', AdminAccess, UserController.updateAccessById);
};
