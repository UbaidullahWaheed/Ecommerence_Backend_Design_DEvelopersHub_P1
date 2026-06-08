// controllers/adminController.js — Admin Panel CRUD

const Product = require('../models/Product');

// GET /admin — Dashboard
exports.getDashboard = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalStock = await Product.aggregate([{ $group: { _id: null, total: { $sum: '$stock' } } }]);
    const categories = await Product.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }]);
    const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(5);

    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      totalProducts,
      totalStock: totalStock[0]?.total || 0,
      categories,
      recentProducts
    });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
};

// GET /admin/products — Manage products
exports.getAdminProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.render('admin/products', { title: 'Manage Products', products });
  } catch (err) {
    console.error(err);
    res.redirect('/admin');
  }
};

// GET /admin/products/new — Add product form
exports.getAddProduct = (req, res) => {
  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Living', 'Sports', 'Beauty', 'Toys', 'Other'];
  res.render('admin/add-product', { title: 'Add Product', categories });
};

// POST /admin/products — Create product
exports.postAddProduct = async (req, res) => {
  try {
    const { name, price, originalPrice, category, description, stock, image, featured } = req.body;

    await Product.create({
      name,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : null,
      category,
      description,
      stock: parseInt(stock),
      image: image || '/images/placeholder.jpg',
      featured: featured === 'on'
    });

    req.flash('success', `"${name}" added successfully!`);
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to add product. Check all required fields.');
    res.redirect('/admin/products/new');
  }
};

// GET /admin/products/:id/edit — Edit form
exports.getEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      req.flash('error', 'Product not found.');
      return res.redirect('/admin/products');
    }
    const categories = ['Electronics', 'Clothing', 'Books', 'Home & Living', 'Sports', 'Beauty', 'Toys', 'Other'];
    res.render('admin/edit-product', { title: `Edit: ${product.name}`, product, categories });
  } catch (err) {
    res.redirect('/admin/products');
  }
};

// PUT /admin/products/:id — Update product
exports.putEditProduct = async (req, res) => {
  try {
    const { name, price, originalPrice, category, description, stock, image, featured } = req.body;

    await Product.findByIdAndUpdate(req.params.id, {
      name,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : null,
      category,
      description,
      stock: parseInt(stock),
      image: image || '/images/placeholder.jpg',
      featured: featured === 'on'
    });

    req.flash('success', 'Product updated successfully!');
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to update product.');
    res.redirect(`/admin/products/${req.params.id}/edit`);
  }
};

// DELETE /admin/products/:id — Delete product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    req.flash('success', 'Product deleted.');
    res.redirect('/admin/products');
  } catch (err) {
    req.flash('error', 'Failed to delete product.');
    res.redirect('/admin/products');
  }
};
