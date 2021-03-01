const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.user,
  });
};
exports.postLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email }).exec();
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;
        if (result == true) {
          req.session.user = user;
          req.session.isLoggedIn = true;
          return req.session.save((err) => {
            if (err) {
              console.error(err);
              return res.redirect('/error');
            }
            res.redirect('/');
          });
        }
        res.redirect('/login');
      });
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    console.error(error);
    res.redirect('/error');
  }

  // User.findById('602aaba80fd2512b70430fcf')
  //   .then((user) => {
  //     req.session.user = user;
  //     req.session.isLoggIn = true;
  // return req.session.save((err) => {
  //   if (err) {
  //     console.error(err);
  //     return res.redirect('/error');
  //   }
  //   res.redirect('/');
  // });
  //   })
  //   .catch((err) => console.error(err));
};
exports.postLogOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/error');
    }
    res.redirect('/');
  });
};
exports.getSignUp = (req, res) => {
  res.render('auth/sign-up', {
    path: '/sign-up',
    pageTitle: 'Sign Up',
    isAuthenticated: req.session.user,
  });
};
exports.postSignUp = (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const comfirmPassword = req.body.comfirmPassword;
    // if (password !== comfirmPassword) {
    //   return res.redirect('/sign-up');
    // }
    // encript pass word and save to DB
    bcrypt.hash(
      password,
      parseInt(process.env.ROUND),
      (err, hashedPassword) => {
        if (err) throw err;
        User.create({
          email,
          password: hashedPassword,
          cart: { items: [] },
        })
          .then(() => {
            res.redirect('/login');
          })
          .catch((err) => {
            console.error(err);
            res.redirect('/sign-up');
          });
      }
    );
  } catch (error) {
    console.error(error);
    res.redirect('/error');
  }
};
