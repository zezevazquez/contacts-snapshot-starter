const renderError = function(error, response, response){
  response.send(`ERROR: ${error.message}\n\n${error.stack}`)
}

const confirmSession = (req, res, next) => {
  console.log('yadddadadda:::::', req.session.name);
  if (!req.session.name) {
    res.render('login')
  }
  next()
}

module.exports = {renderError, confirmSession}
