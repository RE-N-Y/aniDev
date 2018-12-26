const mongoose = require('mongoose');
const CommonController = require('./../controllers/common');
const AuthController = require('./../controllers/auth');

const Anime = mongoose.model('animes');
const Character = mongoose.model('characters');
const EditorAccess = AuthController.requireAccess(['admin', 'editor']);

module.exports = (app) => {
  app.get('/characters/pages/:nPage', EditorAccess, CommonController.getList('characters'));
  app.post('/characters', EditorAccess, (req, res) => {
    Character.findOne({ name: req.body.name }, (err, character) => {
      if (character) {
        res.send({ error: 'character already exists' });
      }
      const relatedAnimesId = [];
      req.body.relatedAnimes.forEach((title) => {
        Anime.findOne({ title }, (err, anime) => {
          relatedAnimesId.push(anime.id);
        });
      });
      const relatedCharactersId = [];
      req.body.relatedCharacters.forEach((name) => {
        Character.findOne({ name }, (err, character) => {
          relatedCharactersId.push(character.id);
        });
      });
      new Character({
        ...req.body,
        relatedAnimes: relatedAnimesId,
        relatedCharacters: relatedCharactersId,
      }).save();
      res.send('Character successfully registed');
    });
  });
  app.get('/characters/:id', CommonController.getById('characters'));
  app.put('/characters/:id', EditorAccess, CommonController.updateById('characters'));
  app.delete('/characters/:id', EditorAccess, CommonController.deleteById('characters'));
};
