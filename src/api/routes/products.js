const express = require('express')

const {
  updateProduct,
  postProduct,
  deleteProduct,
  getProductsByProject,
  getProducts
} = require('../controllers/products')
const upload = require('../../middlewares/file')

const productRoutes = express.Router()

productRoutes
  .route('/')
  .get(getProducts)
  .post(upload.single('img'), postProduct)

productRoutes.route('/:id').put(updateProduct).delete(deleteProduct)

productRoutes.route('/project/:projectId').get(getProductsByProject)

module.exports = productRoutes
