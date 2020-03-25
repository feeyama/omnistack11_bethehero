const express = require('express');
//const crypto = require('crypto');
//const connection = require('./database/connection');
const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');

const routes = express.Router();
//segura o Ctrl e pressiona K e depois C -> Comenta o bloco com //
//Shift + Alt + A -> Comenta o bloco com /* */
// routes.get('/ongs', async(request, response) => {
//     const ongs = await connection('ongs').select('*');
//     return response.json(ongs)
// });
//Rota de login
routes.post('/sessions',sessionController.create);

//Rota das ONGs
routes.get('/ongs', ongController.index)
routes.post('/ongs', ongController.create);
//Rota dos Casos
routes.get('/incidents', incidentController.index);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);
//Rota dos casos especificos de uma ONG
routes.get('/profile', profileController.index);

module.exports = routes;

