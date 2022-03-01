const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../model')

const {
  afterEach, before, beforeEach, describe, it
} = require('mocha')
const { sinlgeVillain, villainsList, postedVillain } = require('../mocks/villains')
const { getAllVillains, getVillainBySlug, saveNewVillain } = require('../../controller/villains')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - villains', () => {
  let response
  let sandbox
  let stubbedCreate
  let stubbedFindOne
  let stubbedFindAll
  let stubbedSend
  let stubbedSendStatus
  let stubbedStatus
  let stubbedStatusDotSend

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindAll = sandbox.stub(models.villain, 'findAll')
    stubbedFindOne = sandbox.stub(models.villain, 'findOne')
    stubbedCreate = sandbox.stub(models.villain, 'create')

    stubbedSend = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    stubbedStatusDotSend = sandbox.stub()
    stubbedStatus = sandbox.stub()

    response = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus,
    }
  })

  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedStatusDotSend })
  })

  afterEach(() => {
    sandbox.reset()
  })
  describe('getAllVillains', () => {
    it('retrieves a list of villains from the database and calls response.send() with the list', async () => {
      stubbedFindAll.returns(villainsList)

      await getAllVillains({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(villainsList)
    })

    it('returns a 500 status when an error occurs retrieving the villain', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllVillains({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve villains, please try again')
    })
  })
  describe('getVillainBySlug', () => {
    // eslint-disable-next-line max-len
    it('retrieves the villain associated with the provided slug from the database and calls response.send() with it', async () => {
      const request = { params: { slug: 'captain-hook' } }

      stubbedFindOne.returns(sinlgeVillain)

      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'captain-hook' } })
      expect(stubbedSend).to.have.been.calledWith(sinlgeVillain)
    })
    it('responds with a 404 status when no matching villain is found', async () => {
      stubbedFindOne.returns(null)
      const request = { params: { slug: 'not-found' } }

      await getVillainBySlug(request, response)
      expect(stubbedFindOne).to.have.been.calledWith({
        where: { slug: 'not-found' },
      })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })
    it('returns a 500 status when an error occurs retrieving the villain by id', async () => {
      const request = { params: { slug: 'captain-hook' } }

      stubbedFindOne.throws('ERROR!')

      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'captain-hook' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Villain not found, please check spelling')
    })
  })
  describe('saveNewVillain', () => {
    // eslint-disable-next-line max-len
    it('accepts new villain details and saves them as a new villain in the database, returning the saved record with a 201 status', async () => {
      const request = { body: { name: 'BonBon', movie: 'Jesus`s Life', slug: 'Dog' } }

      stubbedCreate.returns(sinlgeVillain)

      await saveNewVillain(request, response)

      expect(stubbedCreate).to.have.been.calledWith({ name: 'BonBon', movie: 'Jesus`s Life', slug: 'Dog' })
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusDotSend).to.have.been.calledWith(sinlgeVillain)
    })

    it('returns a 400 status when not all required fields are provided (missing location)', async () => {
      const { name, movie, slug, } = postedVillain
      const request = { body: { name, movie, slug, } }

      await saveNewVillain(request, response)

      expect(stubbedCreate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('This is an error 400')
    })
    it('returns a 500 status when an error occurs saving the new team', async () => {
      const request = { body: { name: 'BonBon', movie: 'Jesus`s Life', slug: 'Dog' } }

      stubbedCreate.throws('ERROR!')

      await saveNewVillain(request, response)

      expect(stubbedCreate).to.have.been.calledWith({ name: 'BonBon', movie: 'Jesus`s Life', slug: 'Dog' })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Can not add Villain')
    })
  })
})

