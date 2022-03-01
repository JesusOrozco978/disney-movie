const Sequelize = require('sequelize')
const villainsModel = require('./villains')


const connection = new Sequelize('disneyMoviesVillains', 'disneyUser', 'disneyPassword', {
  host: 'localhost', dialect: 'mysql'
}) // database, useres name , and then passwoerd of connection

const villain = villainsModel(connection, Sequelize)



module.exports = { villain }




