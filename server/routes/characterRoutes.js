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
  app.get('/characters/pages/:nPage', EditorAccess, CommonController.getList('characters'));
  app.post('/characters', EditorAccess, (req, res) => {
    Character.findOne({ name: req.body.name }, async (err, character) => {
      if (character) {
        res.send({ error: 'character already exists' });
      }
      await new Character(await extractParams(req.body)).save();
      res.send('Character successfully registed');
    });
  });
  app.get('/characters/:id', CommonController.getById('characters'));
  app.put(
    '/characters/:id',
    EditorAccess,
    async (req, res, next) => {
      req.body = await extractParams(req.body);
      next();
    },
    CommonController.updateById('characters'),
  );
  app.delete('/characters/:id', EditorAccess, CommonController.deleteById('characters'));
};
