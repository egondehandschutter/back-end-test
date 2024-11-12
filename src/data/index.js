const { getLogger } = require('../core/logging');
const { PersistentNodeCache } = require('persistent-node-cache');


const config = require('config');

/*const NODE_ENV = config.get('env');
const isDevelopment = NODE_ENV === 'development';*/


const CACHE_NAME = config.get('cache.name');
const CACHE_PERIOD = config.get('cache.period');
const CACHE_DIR = config.get('cache.dir');


let cacheInstance;


/**
 * Create the persistant node-cache.
 *
 * @returns {Object} cacheInstance
 */
async function initializeData() {
  const logger = getLogger();

  logger.info('Creating cache');
  cacheInstance = new PersistentNodeCache(CACHE_NAME, CACHE_PERIOD, CACHE_DIR);

  logger.info('Succesfully initialized cache');

  return cacheInstance;
}

/**
 * Get the persistant node-cache.
 *
 * @returns {Object} cacheInstance
 */
function getCache() {
  if (!cacheInstance)
    throw new Error(
      'Please initialize the data layer before getting the cache instance'
    );
  return cacheInstance;
}

/**
 * Close the persistant node-cache.
 *
 */
async function shutdownData() {
  const logger = getLogger();

  logger.info('Shutting down cache connection');

  cacheInstance.close();
  
  cacheInstance = null;

  logger.info('Cache connection closed');
}


module.exports = {
  initializeData,
  shutdownData,
  getCache, 
};
