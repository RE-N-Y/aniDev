const fs = require('fs');
const mongoose = require('mongoose');
const AdminAccess = require('./../controllers/auth').requireAccess(['admin']);

const Post = mongoose.model('posts');
const Anime = mongoose.model('animes');

const extractParams = async (object) => {
  const mainAnime = await Anime.findOne({ title: object.mainAnime });
  object.mainAnime = mainAnime.id;
  const featuredAnime = await Anime.findOne({ title: object.featuredAnime });
  object.featuredAnime = featuredAnime.id;
  const featuredPosts = await Post.find({ title: { $in: object.featuredPosts } });
  object.featuredPosts = featuredPosts.map(post => post.id);

  return object;
};

module.exports = (app) => {
  app.get('/main', AdminAccess, (req, res) => {
    fs.readFile('siteSetting.json', 'utf8', (err, data) => {
      if (err) {
        res.send('Error occured while retrieving siteSettings');
      }
      res.send(JSON.parse(data));
    });
  });
  app.post('/main', AdminAccess, async (req, res) => {
    const data = await extractParams(req.body.settings);
    fs.writeFile('siteSetting.json', JSON.stringify(data), (err) => {
      if (err) {
        res.send('Error occured while writing siteSettings');
      }
      res.send('Successfully wrote siteSetting');
    });
  });
};
