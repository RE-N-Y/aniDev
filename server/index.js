const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const keys = require('./config/keys');
const cors = require('cors');
const cookieSession = require('cookie-session');
require('./models/Users');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(cors({origin:'http://localhost:3000',credentials:true}));
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.secret]
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);