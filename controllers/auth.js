const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
  const errorMessage = req.flash().error;

  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage,
  });
};
exports.postLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email }).exec();
    // check logging in by email
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        // check logging in by password
        if (err) {
          console.error(err);
          return res.redirect('/error');
        }
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
        req.flash('error', 'Email or password is not correct!');
        res.redirect('/login');
      });
    } else {
      req.flash('error', 'Email or password is not correct!');
      return res.redirect('/login');
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
  const errorMessage = req.flash().error;
  res.render('auth/sign-up', {
    path: '/sign-up',
    pageTitle: 'Sign Up',
    errorMessage,
  });
};
exports.postSignUp = (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const comfirmPassword = req.body.comfirmPassword;
    if (password !== comfirmPassword) {
      req.flash('error', "Your password didn't matched");
      return res.redirect('/sign-up');
    }
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
            if (err && err.code === 11000) {
              req.flash('error', 'This email may be used!');
              res.redirect('/sign-up');
            }
            console.error(err);
          });
      }
    );
  } catch (error) {
    console.error(error);
    res.redirect('/error');
  }
};
