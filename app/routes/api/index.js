const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const watchlistsRouter = require('./watchlists.js');
const portfoliosRouter = require('./portfolios.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/watchlists', watchlistsRouter);

router.use('/portfolios', portfoliosRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
