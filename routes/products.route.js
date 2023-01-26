const express = require('express')

const ProductService = require('./services/products.service')
const validatorHandler = require('../middlewares/validator.handler')
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema')

const service = new ProductService()
const router = express.Router()


// Products
router.get('/', async (req, res, next) => {
  try {
    res.json(await service.find())
  } catch (error) {
    next(error)
  }
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {

  try {
    const {id} = req.params

    res.json(await service.findOne(id))
  } catch (error) {
    next(error)
  }

})

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const {body} = req;

    res.status(201).json(await service.create(body))
  } catch (error) {
    next(error)
  }
})

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {

  try {
    const {id} = req.params
    const {body} = req;

    res.json(await service.update(id, body))
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {

  try {
    const {id} = req.params

    res.json(await service.delete(id))
  } catch (error) {
    next(error)
  }
})

module.exports = router
