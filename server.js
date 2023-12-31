const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');

// Import helpers
const withAuth = require('./utils/auth');
const helpers = require('./utils/helpers'); // Import the helpers.js file

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'SuperSecretSecret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 2, // 2 hours
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const hbs = exphbs.create({
  helpers: {
    format_date: helpers.format_date,
    withAuth: withAuth,
  },
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const routes = require('./controllers');

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
