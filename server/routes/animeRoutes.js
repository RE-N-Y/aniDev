const mongoose = require('mongoose');
const CommonController = require('./../controllers/common');
const AuthController = require('./../controllers/auth');

const Anime = mongoose.model('animes');
const Character = mongoose.model('characters');
const EditorAccess = AuthController.requireAccess(['admin', 'editor']);

module.exports = (app) => {
  app.get('/animes/pages/:nPage', EditorAccess, CommonController.getList('animes'));
  app.post('/animes', EditorAccess, (req, res) => {
    Anime.findOne({ title: req.body.title }, (err, anime) => {
      if (anime) {
        res.send({ error: 'anime already exists' });
      }
      const relatedAnimesId = [];
      relatedAnimes.forEach((title) => {
        Anime.findOne({ title }, (err, anime) => {
          relatedAnimesId.push(anime.id);
        });
      });
      const relatedCharactersId = [];
      relatedCharacters.forEach((name) => {
        Character.findOne({ name }, (err, character) => {
          relatedCharactersId.push(character.id);
        });
      });
      new Anime({
        ...req.body,
        relatedAnimes: relatedAnimesId,
        relatedCharacters: relatedCharactersId,
      }).save();
      res.send('Anime successfully registered');
    });
  });
  app.get('/animes/:id', CommonController.getById('animes'));
  app.put('/animes/:id', EditorAccess, CommonController.updateById('animes'));
  app.delete('/animes/:id', EditorAccess, CommonController.deleteById('animes'));
};
