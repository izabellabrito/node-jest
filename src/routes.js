const routes = require('express').Router();
const authMiddleware = require('../src/app/middleware/auth');

const SessionController = require('./app/controllers/SessionController');

// routes.post('/sessions', (req, res) => {});
routes.post('/sessions', SessionController.store);

// só aplica nas rotas após essa linha
routes.use(authMiddleware);

routes.get('/dashboard', (req, res) => {
  return res.status(200).send();
});

module.exports = routes;
