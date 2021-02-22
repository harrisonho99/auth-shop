exports.getLogin = (req, res, next) => {
  // const isLoggedIn =
  //   req.get('Cookie')?.trim().split(';').join().split('=')[1] === 'true'
  //     ? true
  //     : false;
  console.log('====================================');
  console.log(req.session);
  console.log('====================================');
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: (isLoggedIn = false),
  });
};
exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect('/');
};
