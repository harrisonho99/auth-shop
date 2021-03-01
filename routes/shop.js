const express = require('express');

const authRequest = require('../middlewares/authRequest');

const shopController = require('../controllers/shop');

const router = express.Router();
// protect route

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', authRequest, shopController.getCart);

router.post('/cart', authRequest, shopController.postCart);

router.post(
  '/cart-delete-item',
  authRequest,
  shopController.postCartDeleteProduct
);

router.post('/create-order', authRequest, shopController.postOrder);

router.get('/orders', authRequest, shopController.getOrders);

module.exports = router;
