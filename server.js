const express = require("express");
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const fs = require('fs');
require("dotenv").config();

const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes');

const app = express();
const port = process.env.PORT || 3794;

passport.use(new LocalStrategy(
    (username, password, done) => {
        const usersData = fs.readFileSync('login.json');
        const users = JSON.parse(usersData);
        const user = users.find(u => u.username === username);
        if (!user) {
            return done(null, false);
        }
        bcrypt.compare(password, user.password, (err, res) => {
            if (err) return done(err);
            if (!res) return done(null, false);
            return done(null, user);
        });
    }
));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/api', authRoutes);
app.use('/api', imageRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
