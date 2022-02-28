
const villains = (connection, Sequelize) => {
  return connection.define('villains', {
    id: { type: Sequelize.INTERGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    movie: { type: Sequelize.STRING },
    slug: { type: Sequelize.STRING },


  }, { paranoid: true })
}

module.exports = villains