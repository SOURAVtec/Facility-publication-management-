import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import session from 'express-session';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

// Required to use __dirname with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/alumniDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

// MongoDB User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  googleId: String
});
const User = mongoose.model('User', userSchema);

// Middleware
app.use(express.static(path.join(__dirname, '..','..'))); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy (for Google + form users)
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user)).catch(err => done(err));
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      // Create new user
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        password: await bcrypt.hash(profile.id, 10) // dummy hashed password
      });
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..','..', 'Alumni_home.html'));
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPass });
    await user.save();
    res.redirect('/login.html');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send('Invalid credentials');
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).send('Invalid credentials');
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Login failed');
  }
});

app.get('/dashboard', (req, res) => {
  res.send('Welcome to your dashboard!');
});

// Google OAuth routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login.html' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

// Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
