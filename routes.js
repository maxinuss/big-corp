const bodyParser = require('body-parser');
const offices = require('./src/models/office');

/**
 *
 * @param app
 * @param express
 * @param router
 */
function init(app, express, router) {
  app.use(bodyParser.json());
  app.use('/api/v1/',  apiRoutes(router));
}

/**
 *
 * @param router
 * @returns {*}
 */
function apiRoutes(router) {
  router.get('/health-check', async (req, res) => {
    const result = {
      status: 'OK',
      timestamp: Date.now()
    };

    res.status(200).json(result);
  });

  router.get('/employees', async (req, res) => {
    res.status(200).json();
  });

  router.get('/employees/:id', async (req, res) => {
    res.status(200).json();
  });

  router.get('/departments', async (req, res) => {
    res.status(200).json();
  });

  router.get('/departments/:id', async (req, res) => {
    res.status(200).json();
  });

  router.get('/offices', async (req, res) => {
    const response = await offices.getAll();
    res.status(200).json(response);
  });

  router.get('/offices/:id', async (req, res) => {
    const response = await offices.getOne(req.params.id);
    res.status(200).json(response);
  });

  return router;
}

module.exports.init = init;