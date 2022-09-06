const jwt = require('jsonwebtoken');
const Users = require('../Model/usermodel');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'this is my first time using node and this is my secret code', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

/* Check user */

    const checkUser = (req, res, next) => {
        const token = req.cookies.jwt;

        if (token) {
            jwt.verify(token, 'this is my first time using node and this is my secret code',async (err, decodedToken) => {
              if (err) {
                  console.log(err.message);
                  res.locals.user = null
                  res.redirect('/login');
                    next()
              } else {
                  console.log(decodedToken);
                  let user = await Users.findById(decodedToken.id)
                  res.locals.user = user
                next();
              }
            });
          } else {
            res.redirect('/login');
            res.locals.user = null
            next()
          }
}
    // console.log(chectuser)


module.exports = { requireAuth, checkUser};