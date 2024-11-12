const Router = require('@koa/router');
const Joi = require('joi');
const personService = require('../service/person');
const validate = require('../core/validation');


const getPersonByName = async (ctx) => {
  ctx.body = await personService.getByName(String(ctx.params.name));
};
getPersonByName.validationScheme = {
  params: {
    name: Joi.string().lowercase().max(255),
  },
};

const createPerson = async (ctx) => {
  const person = await personService.create({
    ...ctx.request.body,
  });
  ctx.status = 201;
  ctx.body = person;
};
createPerson.validationScheme = {
  body: {
    name: Joi.string().lowercase().max(255),
    age: Joi.number().integer().min(18),
  },
};


/**
 * Install person routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/persons',
  });

  router.post('/', validate(createPerson.validationScheme),createPerson);
  router.get('/:name', validate(getPersonByName.validationScheme),getPersonByName);

  app.use(router.routes())
     .use(router.allowedMethods());
};