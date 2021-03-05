const path = require('path');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const maxAge = require('./helper/maxAge');
const csrf = require('csurf');
const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

// template engine
app.set('view engine', 'ejs');
app.set('views', 'views');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
//csrf protecction
const csrfProtection = csrf();

//session
const store = new MongoDbStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions',
});
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
    store,
    cookie: {
      maxAge: maxAge({ day: 10 }),
    },
  })
);
app.use(csrfProtection);
app.use((req, _, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id.toString())
    .then((user) => {
      req.user = user;
      return next();
    })
    .catch((err) => console.log(err));
});

// assets
app.use(express.static(path.join(__dirname, 'public')));
//
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.user;
  res.locals.csrfToken = req.csrfToken();
  next();
});
//routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(authRoutes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//connect db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    // User.findOne().then((user) => {
    //   if (!user) {
    //     const user = new User({
    //       name: 'Max',
    //       email: 'max@test.com',
    //       cart: {
    //         items: [],
    //       },
    //     });
    //     user.save();
    //   }
    // });
    app.listen(3000);
  })
  .catch((err) => {
    console.error(err);
  });
