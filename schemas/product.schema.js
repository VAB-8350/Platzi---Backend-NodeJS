const joi = require('joi')

const id    = joi.string().uuid()
const name  = joi.string().min(3).max(15)
const price = joi.number().integer().min(10)
const image = joi.string().min(5)

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
})

const updateProductSchema = joi.object({
  name,
  price,
  image
})

const getProductSchema = joi.object({
  id: id.required()
})

module.exports = {createProductSchema, updateProductSchema, getProductSchema}
