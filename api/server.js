const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Routes
const authRoutes = require('./routes/auth');
const entryRoutes = require('./routes/entry');
const historyRoutes = require('./routes/history');

const app = express();
const PORT = process.env.PORT || 5000;

// general error handler
const errorHandler = (err, req, res, next) => {
  res.send({ error: err.message.split(',') })
}

// Setup body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// input validation
app.use(expressValidator());

// enable cors
app.use(cors({ credentials: true, origin: true }));

// Need to read cookie
app.use(cookieParser());

// passport strategies
require('./auth/auth');

// Routes will begin with `/api/auth`
app.use('/api/auth', authRoutes);
app.use('/api/entries', entryRoutes);
app.use('/api/history', historyRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
