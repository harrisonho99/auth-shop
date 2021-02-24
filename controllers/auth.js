const User = require('../models/user');
exports.getLogin = (req, res) => {
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
exports.postLogin = (req, res) => {
  User.findById('602aaba80fd2512b70430fcf')
    .then((user) => {
      req.session.user = user;
      // req.session.isLoggedIn = true;
      return res.redirect('/');
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
