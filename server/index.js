const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
require("./models/User");

const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/question");
const quizRoutes = require('./routes/quiz');
const candidateRoutes = require('./routes/candidate');
const Keys = require("./config/keys");

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [Keys.COOKIE_KEY]
  })
);
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/quizdb');
authRoutes(app);
questionRoutes(app);
quizRoutes(app);
candidateRoutes(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 8999;
app.listen(port);
