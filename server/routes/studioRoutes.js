const mongoose = require('mongoose');
const CommonController = require('./../controllers/common');
const AuthController = require('./../controllers/auth');

const Anime = mongoose.model('animes');
const Studio = mongoose.model('studios');
const EditorAccess = AuthController.requireAccess(['admin', 'editor']);

const extractParams = async (object) => {
  const animes = await Anime.find({ title: { $in: object.relatedAnimes } });
  object.relatedAnimes = animes.map(anime => anime.id);
  return object;
};

module.exports = (app) => {
  app.get('/studios/pages/:nPage', EditorAccess, CommonController.getList('studios'));
  app.get('/studios/all', CommonController.getAll('studios'));
  app.get('/studios/search/:search', CommonController.search('studios'));
  app.post('/studios', EditorAccess, (req, res) => {
    Studio.findOne({ name: req.body.title }, async (err, studio) => {
      if (studio) {
        res.send({ error: 'studio already exists' });
      }
      await new Studio(await extractParams(req.body)).save();
      res.send('Studio successfully registered');
    });
  });
  app.get('/studios/:id', CommonController.getFullDocById('studios', ['name', 'title']));
  app.put(
    '/studios/:id',
    EditorAccess,
    async (req, res, next) => {
      req.body = await extractParams(req.body);
      next();
    },
    CommonController.updateById('studios'),
  );
  app.delete('/studios/:id', EditorAccess, CommonController.deleteById('studios'));
};
