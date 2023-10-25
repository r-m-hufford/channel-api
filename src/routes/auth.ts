import express from 'express';
import { Sequelize } from 'sequelize';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { sequelize } from '../../config/db';
import { User } from '../models/user';
import jwt from 'jsonwebtoken'

export const authRouter = express.Router();

passport.use(new LocalStrategy.Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, done) {
  User.findOne({ where: { email: email }})
  .then(function(user) {
    console.log('User found:', user);
    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }
    const isPasswordValid = user.validPassword(password);
    console.log('Is password valid:', isPasswordValid);
    if (!isPasswordValid) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  })
  .catch(err => {
    console.log('Error:', err);
    done(err);
  });
}));

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
};

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  User.findOne({ where: { id: jwt_payload.sub }})
    .then(user => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch(err => {
      return done(err, false);
    });
}));

authRouter.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
  const user = req.user as User
  const token = jwt.sign({ id: user?.id }, 'your_jwt_secret');
  res.json({user: req.user, token: token});
});

