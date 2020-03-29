const express = require('express');
//Biblioteca de validação
const { celebrate, Segments, Joi} = require('celebrate');
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

/**
 * Parametros da requisição
 * Query
 * Route
 * Body
 */
//Rota das ONGs
routes.get('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required(),
  }) 
}), ongController.index)

routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(3),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}),  ongController.create);

//Rota dos Casos
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), incidentController.index);

routes.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required().min(1).positive(),
  }), 
}), incidentController.create);

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), incidentController.delete);

//Rota dos casos especificos de uma ONG
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), profileController.index);

module.exports = routes;

