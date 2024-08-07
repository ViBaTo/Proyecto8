require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/config/db')
const productRoutes = require('./src/api/routes/products')
const projectRoutes = require('../Proyecto7/src/api/routes/projects')
const userRoutes = require('../Proyecto7/src/api/routes/users')
const cloudinary = require('cloudinary').v2
const bodyParser = require('body-parser')

const app = express()
connectDB()
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})
app.use(bodyParser.json())
app.use(express.json())

app.use('/api/v1/projects', projectRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/products', productRoutes)

app.use('/ping', (req, res) => {
  res.status(200).json('pong')
})

app.use('*', (req, res) => {
  res.status(404).json('Route not found')
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on port ${port}`))
