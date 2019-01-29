const AdminAccess = require('./../controllers/auth').requireAccess(['admin']);
const CommonController = require('./../controllers/common');

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
};
