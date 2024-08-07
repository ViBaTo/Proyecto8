const Product = require('../models/products')
const Project = require('../models/projects')

const getProducts = async (req, res) => {
  try {
    const products = await Product.find()

    return res.json(products)
  } catch (error) {
    console.error('Error getting products:', error)
    res
      .status(500)
      .json({ message: 'Error getting products', error: error.toString() })
  }
}

const postProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body)
    if (req.file) {
      newProduct.img = req.file.path
    }

    const createdProduct = await newProduct.save()

    // Añadir el producto al array de productos del proyecto
    const projectToUpdate = await Project.findById(req.body.project)
    if (projectToUpdate) {
      projectToUpdate.products.push(createdProduct._id)
      await projectToUpdate.save()
    }

    res.status(201).json(createdProduct)
  } catch (error) {
    console.error('Error creating product:', error)
    res
      .status(500)
      .json({ message: 'Error creating product', error: error.toString() })
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { name, productType, project } = req.body

    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    product.name = name || product.name
    product.productType = productType || product.productType
    product.project = project || product.project

    const updatedProduct = await product.save()

    res.json(updatedProduct)
  } catch (error) {
    console.error('Error updating product:', error)
    res
      .status(500)
      .json({ message: 'Error updating product', error: error.toString() })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params

    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    await product.remove()
    deleteImgCloudinary(product.img)

    res.json({ message: 'Product removed' })
  } catch (error) {
    console.error('Error deleting product:', error)
    res
      .status(500)
      .json({ message: 'Error deleting product', error: error.toString() })
  }
}

const getProductsByProject = async (req, res) => {
  try {
    const { projectId } = req.params

    const products = await Product.find({ project: projectId }).populate(
      'createdBy',
      'name email'
    )
    res.json(products)
  } catch (error) {
    console.error('Error getting products by project:', error)
    res.status(500).json({
      message: 'Error getting products by project',
      error: error.toString()
    })
  }
}

module.exports = {
  getProducts,
  postProduct,
  updateProduct,
  deleteProduct,
  getProductsByProject
}
