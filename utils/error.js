const handleErrors = (err, res) =>{
  console.error(err.message)
  if (err.name){
    return res.status(400).send({message: err.message, name: err.name})
  }
  return res.status(500)

}

module.exports = handleErrors
