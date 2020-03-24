const { Router } = require('express');
const routes = Router();

const OngController = require('./controllers/ong_controller');
const IncidentController = require('./controllers/Incident_controller');
const ProfileController = require('./controllers/Profilecontroller');
const SessionController = require('./controllers/Sessioncontroller');

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

module.exports = routes;