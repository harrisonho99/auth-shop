const path = require('path');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');
const MONGO_URI =
  'mongodb+srv://root:142536@mongoosedb.cc1rl.mongodb.net/shop?retryWrites=true&w=majority';
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
//session

const store = new MongoDbStore({
  uri: MONGO_URI,
  collection: 'sessions',
});
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
    store,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5bab316ce0a7c75f783cb8a8')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(authRoutes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
