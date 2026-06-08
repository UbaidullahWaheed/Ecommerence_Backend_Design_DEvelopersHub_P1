// ============================================
//   app.js — Main Server Entry Point
//   eCommerce Backend — DevelopersHub Intern
// ============================================

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');

const connectDB = require('./config/db');

// Route imports
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Database Connection ───────────────────
connectDB();

// ─── View Engine ──────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ─── Middleware ───────────────────────────
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Session & Flash
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 7 days
}));
app.use(flash());

// ─── Global Template Variables ────────────
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.session.user || null;
  next();
});

// ─── Routes ───────────────────────────────
app.use('/', authRoutes);
app.use('/products', productRoutes);
app.use('/admin', adminRoutes);

// Home route
app.get('/', async (req, res) => {
  try {
    const Product = require('./models/Product');
    const featured = await Product.find({ featured: true }, { limit: 8 });
    const latest = await Product.find({}, { limit: 8 });
    res.render('index', { featured, latest, title: 'ShopVerse — Home' });
  } catch (err) {
    console.error(err);
    res.render('index', { featured: [], latest: [], title: 'ShopVerse — Home' });
  }
});

// ─── 404 Handler ──────────────────────────
app.use((req, res) => {
  res.status(404).render('404', { title: '404 — Page Not Found' });
});

// ─── Error Handler ────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { title: 'Server Error', message: err.message });
});

// ─── Start Server ─────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️  Database: Connecting to MongoDB...\n`);
});

module.exports = app;
