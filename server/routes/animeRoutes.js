const mongoose = require('mongoose');
const CommonController = require('./../controllers/common');
const AuthController = require('./../controllers/auth');

const Anime = mongoose.model('animes');
const Character = mongoose.model('characters');
const EditorAccess = AuthController.requireAccess(['admin', 'editor']);

const extractParams = async (object) => {
  const animes = await Anime.find({ title: { $in: object.relatedAnimes } });
  object.relatedAnimes = animes.map(anime => anime.id);
  const characters = await Character.find({ name: { $in: object.relatedCharacters } });
  object.relatedCharacters = characters.map(character => character.id);
  return object;
};

module.exports = (app) => {
  app.get('/animes/pages/:nPage', EditorAccess, CommonController.getList('animes'));
  app.get('/animes/all', CommonController.getAll('animes'));
  app.get('/animes/search/:search', CommonController.search('animes'));
  app.post('/animes', EditorAccess, (req, res) => {
    Anime.findOne({ title: req.body.title }, async (err, anime) => {
      if (anime) {
        res.send({ error: 'anime already exists' });
      }
      await new Anime(await extractParams(req.body)).save();
      res.send('Anime successfully registered');
    });
  });
  app.get('/animes/:id', CommonController.getFullDocById('animes', ['name', 'title']));
  app.put(
    '/animes/:id',
    EditorAccess,
    async (req, res, next) => {
      req.body = await extractParams(req.body);
      next();
    },
    CommonController.updateById('animes'),
  );
  app.delete('/animes/:id', EditorAccess, CommonController.deleteById('animes'));
};
