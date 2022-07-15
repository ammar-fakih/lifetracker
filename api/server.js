const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');
const { NotFoundError } = require('./utils/errors');
const authRoutes = require('./routes/auth');
const trackingRoutes = require('./routes/tracking');
const security = require('./middleware/security');

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan('tiny'));

app.use(security.extractUserFromJwt);

app.get('/', (req, res) => {
  res.send({ ping: "pong" });
});

app.use('/auth', authRoutes);
app.use('/tracking', trackingRoutes);

app.use((req, res, next) => {
  return next(new NotFoundError());
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({ error: { message, status } });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
