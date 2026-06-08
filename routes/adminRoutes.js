// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireAdmin } = require('../middleware/authMiddleware');

// All admin routes require admin role
router.use(requireAdmin);

router.get('/', adminController.getDashboard);
router.get('/products', adminController.getAdminProducts);
router.get('/products/new', adminController.getAddProduct);
router.post('/products', adminController.postAddProduct);
router.get('/products/:id/edit', adminController.getEditProduct);
router.put('/products/:id', adminController.putEditProduct);
router.delete('/products/:id', adminController.deleteProduct);

module.exports = router;
