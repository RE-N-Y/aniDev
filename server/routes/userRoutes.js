const AdminAccess = require('./../controllers/auth').requireAccess(['admin']);
const CommonController = require('./../controllers/common');

module.exports = (app) => {
  app.get('/users/:nPage', AdminAccess, CommonController.getList);
  app.put('/user/:id', AdminAccess, CommonController.updateById);
};
