const express = require('express');
const router = express.Router();

const { 
    getProducts, 
    getProductById, 
    deleteProduct, 
    createProduct, 
    updateProduct ,
    createProductReview,
    getTopProducts
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)


module.exports = {productRoutes: router};