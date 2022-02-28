const models = require('../model')

const getAllVillains = async (request, response) => {
  try {
    const villainsData = await models.villains.findALL()

    return response.send(villainsData)
  } catch (e) {
    return response.status(500).send('error')
  }
}

// const getVillainBySlug = async (request, response) => {
//   const { slug } = request.params
//   const foundVillain = await models.villains.findOne({ where: { slug: slug } })

//   return response.send(foundVillain)
// }

// const saveNewVillain = async (request, response) => {
//   const { id, name, movie, slug } = request.body

//   if (!id || !name || !movie || !slug) {
//     return response.status(400).send('This is an error 400')
//   }

//   const newVillain = await models.villain.create({ id, name, movie, slug })

//   return response.status(201).send(newVillain)
// }


module.exports = (getAllVillains)
