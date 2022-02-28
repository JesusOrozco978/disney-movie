const Sequilize = require('sequelize')
const villainsModel = require('./villains')


const connection = new Sequilize('disneyMoviesVillains', 'disneyUser', 'disneyPassword', {
  host: 'localhost', dialect: 'mysql'
}) // database, useres name , and then passwoerd of connection

const villain = villainsModel(connection, Sequilize)



module.exports = { villain }




