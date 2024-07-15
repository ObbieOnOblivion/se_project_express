const BAD_REQUEST = 400;
const DEFAULT = 500;
const NOT_FOUND = 404;
const INVALIDAUTH = 401
const FORBIDEN = 403
const CONFLICT = 409;

const handleErrors = (err, res) => {
  if (err.name === 'CastError') {
    return res.status(BAD_REQUEST).send({ message: err.message, name: err.name })
  }
  if (err.name === 'ValidationError') {
    return res.status(BAD_REQUEST).send({ message: err.message, name: err.name })
  }
  if (err.name === 'DocumentNotFoundError') {
    return res.status(NOT_FOUND).send({ message: err.message, name: err.name })
  }
  if (err.name === 'Invalid credentials') {
    return res.status(INVALIDAUTH).send({ message: err.message, name: err.name })
  }
  if (err.message === 'Incorrect password') {
    return res.status(INVALIDAUTH).send({ message: err.message, name: err.name })
  }
  if (err.message === 'Incorrect email') {
    return res.status(INVALIDAUTH).send({ message: err.message, name: err.name })
  }
  if (err.message === 'Email already in use') {
    return res.status(CONFLICT).send({ message: err.message, name: err.name })
  }
  if (err.message === 'Forbidden'){
    return res.status(FORBIDEN).send({ message: err.message, name: err.name})
  }
  if (err.message === 'Unauthorized') {
    return res.status(INVALIDAUTH).send({ message: err.message, name: err.name })
  }
  if (err.message === "Route not found") {
    return res.status(NOT_FOUND).send({ message: err.message, name: err.name })
  }
  return res.status(DEFAULT).send({ message: "Oopsies! Something happened on our end" })

}

module.exports = handleErrors
