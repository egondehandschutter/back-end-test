const personsRepository = require('../repository/person'); 
const ServiceError = require('../core/serviceError');
const handleDBError = require('./_handleDBError');

/**
 * Get the person with the name.
 *
 * @param {string} name - The name of the person.
 * @returns {object} Person with name and age of the person.
 */
const getByName = async (name) => {
  const person = await personsRepository.findByName(name);
  
  if (!person) {
    throw ServiceError.notFound(`No person with name ${name} exists`, { name });
  }

  return person;
};

/**
 * Create a person.
 *
 * @param {string} name - The name of the person.
 * @param {string} age - The age of the person.
 * @returns {object} Person - Person information.
 */
const create = async ({ name, age }) => {
  try {
    const ret = await personsRepository.create({ name, age });
    return getByName(ret);
  } catch (error) {
    throw handleDBError(error);
  }
};


module.exports = {
  getByName,
  create,
};

