const Products = require('../models/productModel')
const { getPostData } = require('../utils')

// @desc gets all prodcuts
// @route GET /api/prodcuts
async function getProducts(req, res) {
    try {
        const products = await Products.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error)
    }
}

// @desc gets one prodcut
// @route GET /api/prodcut/id

async function getProduct(req, res, id) {
    try {
        const product = await Products.findById(id)

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product not found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc createProduct
// @route POST /api/prodcuts
async function createProduct(req, res) {
    try {
        const body = await getPostData(req)

        const { title, description, price } = JSON.parse(body)

        const product = {
            title,
            description,
            price
        }

        const newProduct = await Products.create(product)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSONstringify(newProduct))
    } catch (error) {
        console.log(error)
    }
}
// @desc updateProduct
// @route PUT /api/prodcuts/:id
async function updateProduct(req, res, id) {
    try {
        const product = await Products.findById(id)

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product not found' }))
        } else {
             const body = await getPostData(req)

        const { title, description, price } = JSON.parse(body)

        const productData = {
            title : title || product.title,
            description: description || product.description,
            price: price || product.price
        }

        const updProduct = await Products.update(id, productData)

        res.writeHead(200, { 'Content-Type': 'application/json' })
        return res.end(JSONstringify(updProduct))
        }

       
    } catch (error) {
        console.log(error)
    }
}

// @desc deleteProduct
// @route DELETE /api/prodcuts/:id
async function deleteProduct(req, res, id) {
    try {
        const product = await Products.findById(id)

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product not found' }))
        } else {
            await Products.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({message: `Product ${id} removed`}))
        }
    } catch (error) {
        console.log(error)
    }
}




module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}