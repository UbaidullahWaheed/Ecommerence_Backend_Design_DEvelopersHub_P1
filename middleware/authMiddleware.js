// middleware/authMiddleware.js — JWT & Session Auth Guards

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes — redirect to login if not authenticated
const requireLogin = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  req.flash('error', 'Please log in to access this page.');
  res.redirect('/login');
};

// Admin-only routes
const requireAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  req.flash('error', 'Admin access required.');
  res.redirect('/');
};

// Optional auth — attaches user if logged in, doesn't block
const optionalAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    res.locals.currentUser = req.session.user;
  }
  next();
};

module.exports = { requireLogin, requireAdmin, optionalAuth };
