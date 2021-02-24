const User = require('../models/user');
exports.getLogin = (req, res, next) => {
  // const isLoggedIn =
  //   req.get('Cookie')?.trim().split(';').join().split('=')[1] === 'true'
  //     ? true
  //     : false;
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.user,
  });
};
exports.postLogin = (req, res, next) => {
  User.findById('602aaba80fd2512b70430fcf')
    .then((user) => {
      req.session.user = user;
      // req.session.isLoggedIn = true;
      return res.redirect('/');
    })
    .catch((err) => console.log(err));
};
exports.postLogOut = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/error');
    }
    res.redirect('/');
  });
};
