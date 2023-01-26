const faker = require('faker')
const boom = require('@hapi/boom')

class ProductService {

  constructor() {
    this.products = []
    this.generate()
  }

  generate(limit = 100) {

    for (let i = 0; i < limit; i++) {

      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      })
    }
  }

  async create(body) {

    const newBody = {id: faker.datatype.uuid(), ...body}

    this.products.push(newBody)

    return {
      message: 'success',
      data: newBody
    }
  }

  async find() {
    return this.products
  }

  async findOne(id) {
    const product = this.products.find(prod => prod.id === id)

    if (!product) {
      throw boom.notFound('product not found')
    }

    if (product.isBlock) {
      throw boom.conflict('product is block')
    }

    return product
  }

  async update(id, body) {

    const indexProd = this.products.findIndex(prod => prod.id === id)

    if (indexProd === -1) {
      throw boom.notFound('product not found')
    }

    const product = this.products.find(prod => prod.id === id)

    if (product.isBlock) {
      throw boom.conflict('product is block')
    }

    this.products[indexProd] = {...product, ...body}

    return {
      message: 'updated',
      data: this.products[indexProd]
    }
  }

  async delete(id) {
    const index = this.products.findIndex(prod => prod.id === id)

    if (index === -1) {
      throw boom.notFound('product not found')
    }

    if (this.product[index].isBlock) {
      throw boom.conflict('product is block')
    }

    this.products.splice(index, 1)

    return {
      message: 'Deleted is success',
      id
    }
  }

}

module.exports = ProductService
