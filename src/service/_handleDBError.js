const ServiceError = require('../core/serviceError');

const handleDBError = (error) => {
  const { code = '', sqlMessage } = error;

  if (code === 'ER_DUP_ENTRY') {
    switch (true) {
      case sqlMessage.includes('idx_person_name_unique'):
        return ServiceError.validationFailed(
          'A person with this name already exists'
        );
      default:
        return ServiceError.validationFailed('This item already exists');
    }
  }

  // Return error because we don't know what happened
  return error;
};

module.exports = handleDBError;
