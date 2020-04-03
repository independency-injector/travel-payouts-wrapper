const { ExtractJwt, Strategy } = require('passport-jwt');
const User = require('../models/index');
const { JWT_ENCRYPTION } = process.env;
const { to } = require('../util/requestHelper');

module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = JWT_ENCRYPTION;
    passport.use(new Strategy(opts, async function (jwt_payload, done) {
        let err, user;
        [err, user] = await to(User.findOne({where: {id: jwt_payload.user_id} }));
        if (err) return done(err, false);
        if (user) {
          return done(null, user);
        } else{
          return done(null, false);
        }
      }));
};