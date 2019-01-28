const AdminAccess = require('./../controllers/auth').requireAccess(['admin']);
const CommonController = require('./../controllers/common');

module.exports = (app) => {
  app.get('/users/pages/:nPage', AdminAccess, CommonController.getList('users'));
  app.put('/user/:id', AdminAccess, CommonController.updateById);
  app.get('/users/:id', CommonController.getById('users'));
};
