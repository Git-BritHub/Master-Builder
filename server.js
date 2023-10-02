const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

require("dotenv").config()

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js engine with customer helpers


const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
const hbs = exphbs.create({ helpers });

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);

// Directs Railway to the handlebars files
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("images"));


// turn on routes
app.use(require("./controllers/"));

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, "0.0.0.0", () => console.log('Now listening'));
});