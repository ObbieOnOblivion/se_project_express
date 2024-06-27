const handleErrors = (err, res) => {
  if (err.name !== "CastError") {
    return res.status(400).send({ message: err.message, name: err.name })
  }
  if (err.name) {
    res.status(404).send({ message: "Oops, it looks like the items does not exist!" })
  }
  return res.status(500).res.send({ message: "Oopsies! Something happened on our end" })

}

module.exports = handleErrors
