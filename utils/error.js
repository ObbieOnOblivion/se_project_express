const BAD_REQUEST = 400;
const DEFAULT = 500;
const NOT_FOUND = 404;

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
  return res.status(DEFAULT).res.send({ message: "Oopsies! Something happened on our end" })

}

module.exports = handleErrors
