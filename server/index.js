const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
require('./models/Users');
require('./models/Posts');
require('./models/Animes');
require('./models/Characters');
require('./models/Studio');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.secret],
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*', limit: '50mb' }));

require('./routes/authRoutes')(app);
require('./routes/postRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/characterRoutes')(app);
require('./routes/animeRoutes')(app);
require('./routes/studioRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
