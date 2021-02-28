const User = require('../models/user');
exports.getLogin = (req, res) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.user,
  });
};
exports.postLogin = (req, res) => {
  User.findById('602aaba80fd2512b70430fcf')
    .then((user) => {
      req.session.user = user;
      req.session.isLoggIn = true;
      return req.session.save((err) => {
        if (err) {
          console.error(err);
          return res.redirect('/error');
        }
        res.redirect('/');
      });
    })
    .catch((err) => console.error(err));
};
exports.postLogOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/error');
    }
    res.redirect('/');
  });
};
exports.getSignIn = (req, res) => {
  res.render('auth/sign-in', {
    path: '/sign-up',
    pageTitle: 'Sign Up',
    isAuthenticated: req.session.user,
  });
};
exports.postSignUp = (req, res) => {};
