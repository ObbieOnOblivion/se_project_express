const BAD_REQUEST = 400;
const DEFAULT = 500;
const NOT_FOUND = 404;
const UNAUTHORIZED = 403;
const INVALIDAUTH = 401
const CONFLICT = 409;

const handleErrors = (err, res) => {
  if (err.name === 'CastError') {
    res.status(BAD_REQUEST).send({ message: err.message, name: err.name })
  }
  if (err.name === 'ValidationError') {
    res.status(BAD_REQUEST).send({ message: err.message, name: err.name })
  }
  if (err.name === 'DocumentNotFoundError') {
    res.status(NOT_FOUND).send({ message: err.message, name: err.name })
  }
  if (err.message === 'Incorrect password') {
    res.status(INVALIDAUTH).send({ message: err.message, name: err.name })
  }
  if (err.message === 'Incorrect email') {
    res.status(INVALIDAUTH).send({ message: err.message, name: err.name })
  }
  if (err.message === 'Email already in use') {
    res.status(CONFLICT).send({ message: err.message, name: err.name })
  }
  if (err.message === 'Unauthorized') {
    res.status(UNAUTHORIZED).send({ message: err.message, name: err.name })
  }
  if (err.message === "Route not found") {
    res.status(NOT_FOUND).send({ message: err.message, name: err.name })
  }
  return res.status(DEFAULT).send({ message: "Oopsies! Something happened on our end" })

}

module.exports = handleErrors
