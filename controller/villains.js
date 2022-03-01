const models = require('../model')

const getAllVillains = async (request, response) => {
  try {
    const villainsData = await models.villain.findAll({ attributes: ['name', 'movie', 'slug'] })

    return response.send(villainsData)
  } catch (error) {
    return response.status(500).send('Unable to retrieve villains, please try again')
  }
}

const getVillainBySlug = async (request, response) => {
  try {
    const { slug } = request.params
    const foundVillain = await models.villain.findOne({ where: { slug } })

    return foundVillain
      ? response.send(foundVillain) : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('Villain not found, please check spelling')
  }
}

const saveNewVillain = async (request, response) => {
  try {
    const { name, movie, slug } = request.body

    if (!name || !movie || !slug) {
      return response.status(400).send('This is an error 400')
    }

    const newVillain = await models.villain.create({ name, movie, slug })

    return response.status(201).send(newVillain)
  } catch (error) {
    return response.status(500).send('Can not add Villain')
  }
}


module.exports = { getAllVillains, saveNewVillain, getVillainBySlug }
