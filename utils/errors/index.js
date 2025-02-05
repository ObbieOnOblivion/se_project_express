const NotFoundError = require('./NotFoundError');
const BadRequestError = require('./BadRequestError');
const UnauthorizedError = require('./UnauthorizedError');
const ForbiddenError = require('./ForbiddenError');
const ConflictError = require('./ConflictError');
const InternalServerError = require('./InternalServerError');

const handleErrors = (err) => {
  if (
    err instanceof NotFoundError ||
    err instanceof BadRequestError ||
    err instanceof UnauthorizedError ||
    err instanceof ForbiddenError ||
    err instanceof ConflictError
  ) {
    throw err;
  }

  if (err.name === 'CastError' || err.name === 'ValidationError') {
    throw new NotFoundError();
  }

  throw new InternalServerError();
};

module.exports = { NotFoundError, BadRequestError, UnauthorizedError, ForbiddenError, ConflictError, handleErrors, InternalServerError };
