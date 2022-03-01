const express = require('express')
const bodyParser = require('body-parser')
const { getAllVillains, getVillainBySlug, saveNewVillain } = require('./controller/villains')
const app = express()


app.get('/villains', getAllVillains)

app.get('/villains/:slug', getVillainBySlug)

app.post('/villains', bodyParser.json(), saveNewVillain)


// This has to be last.
// app.all('*', (request, response) => {
//   return response.status(404).send('This is a 404 error')
// })

app.listen(1337)
