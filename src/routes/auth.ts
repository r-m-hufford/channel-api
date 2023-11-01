import express from 'express';
import { Sequelize } from 'sequelize';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { sequelize } from '../../config/db';
import { User } from '../models/user';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { generateToken } from '../utils/jwt';
import { findOrCreateGoogleUser } from '../services/user-service';
import { logout } from '../services/auth-service';

export const authRouter = express.Router();

passport.use(new LocalStrategy.Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async function(email, password, done) {
  try {
    const user = await User.findOne({ 
      attributes: ['id', 'name', 'email', 'password', 'createdAt', 'updatedAt'],
      where: { email: email }
    });

    if (!user) {
      return done(null, false, { message: 'Incorrect password or email.' });
    }

    const isPasswordValid = user.validPassword(password);
    if (!isPasswordValid) {
      return done(null, false, { message: 'Incorrect password or email.' });
    }

    const userObject = user.toJSON();
    delete userObject.password;
    return done(null, userObject);
  } catch (err) {
    console.log('Error:', err);
    done(err);
  }
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
    console.log('profile', profile);
    const user = await findOrCreateGoogleUser(profile);

    if (!user) {
      throw new Error('error retrieving or creating user');
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
  console.log(token);
  res.cookie('token', token, { httpOnly: true, secure: true });
  res.json({user: req.user});
});

authRouter.get('/google', passport.authenticate('google', {scope: ['profile', 'email'], session: false}), (req, res) => {})

authRouter.get('/google/callback', passport.authenticate('google', { 
  failureRedirect: '/',
  session: false }), (req, res) => {
  const user = req.user as User
  const token = generateToken(user);
  res.cookie('token', token, { httpOnly: true, secure: true });
  res.json({user: req.user});
});

authRouter.post('/logout', (req, res) => {
  console.log(req.cookies['token']);
  logout(req, res);
  res.clearCookie('token');
  res.json({message: 'Logged out'});
});
