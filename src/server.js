const express = require('express')
const routes = require('./server/routes');
const middleware = require('./server/middleware')

const app = express()

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/pages')

app.use('/', middleware)
app.use('/', routes)

app.use((request, response) => {
  response.render('not_found')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
