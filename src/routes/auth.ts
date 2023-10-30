import express from 'express';
import { Sequelize } from 'sequelize';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { sequelize } from '../../config/db';
import { User } from '../models/user';
import jwt from 'jsonwebtoken'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { validatePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';

export const authRouter = express.Router();

passport.use(new LocalStrategy.Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, done) {
  User.findOne({ 
    attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    where: { email: email }
  })
  .then(function(user) {
    if (!user) {
      return done(null, false, { message: 'Incorrect password or email.' });
    }
    const isPasswordValid = validatePassword(password, user);
    if (!isPasswordValid) {
      return done(null, false, { message: 'Incorrect password or email.' });
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

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const callbackURL = 'http://localhost:3000/auth/google/callback';

if (!clientID || !clientSecret) {
  throw new Error('Missing Google OAuth environment variables');
}

passport.use(new GoogleStrategy({
  clientID,
  clientSecret,
  callbackURL
}, async function(accessToken, refreshToken, profile, done) {
  try {
    const email = profile._json.email;
    const user = await User.findOne({ where: { email: email }});

    if (!user) {
      const newUser = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: email
      });

        return done(null, newUser);
    } else {
        if (user.googleId !== profile.id) {
          throw new Error('id mismatch error');
        }
        return done(null, user);
      }
    } catch (error) {
    done(error instanceof Error ? error : new Error(String(error)));
  }
}))

authRouter.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
  const user = req.user as User
  const token = generateToken(user)
  res.json({user: req.user, token});
});

authRouter.get('/google', passport.authenticate('google', {scope: ['profile', 'email'], session: false}), (req, res) => {})

authRouter.get('/google/callback', passport.authenticate('google', { 
  failureRedirect: '/',
  successRedirect: '/users',
  session: false }), (req, res) => {
  const user = req.user as User
  const token = generateToken(user);
  res.json({user: req.user, token});
});
