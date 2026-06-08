// controllers/productController.js

const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const { search, category, sort, page = 1 } = req.query;
    const LIMIT = 12;
    const skip  = (parseInt(page) - 1) * LIMIT;

    let query = {};

    if (search && search.trim()) {
      query.$or = [
        { name:        { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
        { category:    { $regex: search.trim(), $options: 'i' } },
      ];
    }
    if (category && category !== 'All') query.category = category;

    let sortOpt = null; // null = newest (default reverse)
    if (sort === 'price-asc')  sortOpt = { price: 1 };
    if (sort === 'price-desc') sortOpt = { price: -1 };
    if (sort === 'rating')     sortOpt = { rating: -1 };
    if (sort === 'name')       sortOpt = { name: 1 };

    const total    = await Product.countDocuments(query);
    const products = await Product.find(query, { sort: sortOpt, skip, limit: LIMIT });
    const totalPages = Math.ceil(total / LIMIT);

    const categories = ['All','Electronics','Clothing','Books','Home & Living','Sports','Beauty','Toys','Other'];

    res.render('products', {
      title: 'All Products',
      products,
      categories,
      currentPage:      parseInt(page),
      totalPages,
      total,
      search:           search || '',
      selectedCategory: category || 'All',
      selectedSort:     sort    || 'newest',
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to load products.');
    res.redirect('/');
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      req.flash('error', 'Product not found.');
      return res.redirect('/products');
    }
    const related = await Product.find(
      { category: product.category, _id: { $ne: product._id } },
      { limit: 5 }
    );
    res.render('product', { title: product.name, product, related });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Product not found.');
    res.redirect('/products');
  }
};
