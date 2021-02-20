exports.getLogin = (req, res, next) => {
  const isLoggedIn =
    req.get('Cookie')?.trim().split(';').join().split('=')[1] === 'true'
      ? true
      : false;
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: isLoggedIn,
  });
};
exports.postLogin = (req, res, next) => {
  req.isLoggin = true;
  res.setHeader('Set-Cookie', 'loggedIn=true; Max-Age=10');
  res.redirect('/');
};
