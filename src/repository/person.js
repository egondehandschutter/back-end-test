const { getCache } = require('../data');
const { getLogger } = require('../core/logging');


/**
 * Find the person with the name in the cache.
 *
 * @param {string} name - The name of the person.
 * @returns {object} Person with name and age of the person.
 */
const findByName = async (name) => {
  const age = getCache().get(name);
  if (!age) return age;
  else  return {
    name,
    age
  };
};

/**
 * Create a person in the cache.
 *
 * @param {string} name - The name of the person.
 * @param {string} age - The age of the person.
 * @returns {string} name - The name of the created person.
 */
const create = async ({ name, age }) => {
  try{
    if (getCache().has(name)) {
      throw({
        code: 'ER_DUP_ENTRY',
        sqlMessage: 'idx_person_name_unique' 
      });
    }
    getCache().set(name, age);
    return name;
  } catch (error) {
    getLogger().error('Error in create', {
      error,
    });
    throw error;
  }
}


module.exports = {
  findByName,
  create,
};