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
  const { slug } = request.params
  const foundVillain = await models.villain.findOne({ where: { slug: slug } })

  return response.send(foundVillain)
}

const saveNewVillain = async (request, response) => {
  const { name, movie, slug } = request.body

  if (!name || !movie || !slug) {
    return response.status(400).send('This is an error 400')
  }

  const newVillain = await models.villain.create({ name, movie, slug })

  return response.status(201).send(newVillain)
}


module.exports = { getAllVillains, saveNewVillain, getVillainBySlug }
