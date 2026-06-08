# ShopVerse — eCommerce Backend
### DevelopersHub Internship — Phase 1 Task

A professional full-stack eCommerce backend built with **Node.js**, **Express**, **MongoDB**, and **EJS** templating — complete with JWT authentication, admin panel, search, filtering, and pagination.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Open the `.env` file and update your MongoDB URI:
```
MONGODB_URI=mongodb://localhost:27017/ecommerce_db
```
> **MongoDB Atlas (Recommended):** Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com), get your connection string, and paste it here.

### 3. Seed the Database
```bash
node seedDB.js
```
This creates 12 sample products and two accounts:
| Role  | Email                    | Password  |
|-------|--------------------------|-----------|
| Admin | admin@shopverse.com      | admin123  |
| User  | user@shopverse.com       | user123   |

### 4. Start the Server
```bash
npm run dev        # Development (auto-restart on save)
npm start          # Production
```

### 5. Open in Browser
```
http://localhost:3000
```

---

## 📁 Project Structure

```
ecommerce-backend-design/
├── config/
│   └── db.js                  ← MongoDB connection
├── controllers/
│   ├── authController.js      ← Login, signup, logout logic
│   ├── productController.js   ← Product listing, detail, search
│   └── adminController.js     ← Admin CRUD operations
├── middleware/
│   └── authMiddleware.js      ← requireLogin, requireAdmin guards
├── models/
│   ├── Product.js             ← Product schema (Mongoose)
│   └── User.js                ← User schema with bcrypt hashing
├── routes/
│   ├── authRoutes.js          ← /login /signup /logout
│   ├── productRoutes.js       ← /products /products/:id
│   └── adminRoutes.js         ← /admin (protected)
├── views/
│   ├── partials/
│   │   ├── header.ejs         ← Navbar + flash messages
│   │   └── footer.ejs         ← Footer + scripts
│   ├── auth/
│   │   ├── login.ejs
│   │   └── signup.ejs
│   ├── admin/
│   │   ├── dashboard.ejs
│   │   ├── products.ejs
│   │   ├── add-product.ejs
│   │   └── edit-product.ejs
│   ├── index.ejs              ← Homepage
│   ├── products.ejs           ← Product listing + search
│   ├── product.ejs            ← Product detail page
│   ├── 404.ejs
│   └── error.ejs
├── public/
│   ├── css/style.css          ← Complete stylesheet
│   └── js/main.js             ← Client-side JS
├── app.js                     ← Main server entry point
├── seedDB.js                  ← Database seeder
├── .env                       ← Environment variables (never commit)
├── .gitignore
└── package.json
```

---

## 🌐 Routes

| Method | Route                        | Description            | Auth Required |
|--------|------------------------------|------------------------|---------------|
| GET    | `/`                          | Homepage               | No            |
| GET    | `/products`                  | Product listing        | No            |
| GET    | `/products?search=...`       | Search products        | No            |
| GET    | `/products?category=...`     | Filter by category     | No            |
| GET    | `/products?page=2`           | Pagination             | No            |
| GET    | `/products/:id`              | Product detail         | No            |
| GET    | `/login`                     | Login page             | No            |
| POST   | `/login`                     | Login action           | No            |
| GET    | `/signup`                    | Signup page            | No            |
| POST   | `/signup`                    | Register user          | No            |
| GET    | `/logout`                    | Logout                 | Yes           |
| GET    | `/admin`                     | Admin dashboard        | Admin only    |
| GET    | `/admin/products`            | Manage products        | Admin only    |
| GET    | `/admin/products/new`        | Add product form       | Admin only    |
| POST   | `/admin/products`            | Create product         | Admin only    |
| GET    | `/admin/products/:id/edit`   | Edit product form      | Admin only    |
| PUT    | `/admin/products/:id`        | Update product         | Admin only    |
| DELETE | `/admin/products/:id`        | Delete product         | Admin only    |

---

## 🛠 Tech Stack

| Technology     | Purpose                            |
|----------------|------------------------------------|
| Node.js        | JavaScript runtime                 |
| Express.js     | Web framework & routing            |
| MongoDB        | NoSQL database                     |
| Mongoose       | MongoDB object modeling            |
| EJS            | Server-side HTML templating        |
| bcryptjs       | Password hashing                   |
| jsonwebtoken   | JWT authentication                 |
| express-session| Session management                 |
| connect-flash  | Flash messages                     |
| method-override| PUT/DELETE from HTML forms         |
| dotenv         | Environment variable management    |
| nodemon        | Auto-restart in development        |

---

## 📦 Deployment to Render

1. Push your code to GitHub (make sure `.env` is in `.gitignore`)
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables from your `.env` file
7. Deploy!

---

## 📋 Task Completion Checklist

### Week 1 ✅
- [x] Node.js + Express server setup
- [x] EJS templating engine configured
- [x] Home page route (`/`)
- [x] Product listing route (`/products`)
- [x] Product detail route (`/products/:id`)
- [x] Mobile-responsive CSS
- [x] Navbar with mobile hamburger menu

### Week 2 ✅
- [x] MongoDB + Mongoose connection
- [x] Product model with full schema
- [x] Dynamic product rendering with EJS
- [x] Search functionality
- [x] Category filtering
- [x] Sort options (price, rating, newest)

### Week 3 ✅
- [x] User model with bcrypt password hashing
- [x] JWT-based authentication
- [x] Session management
- [x] Login / Signup pages
- [x] Protected admin routes (middleware)
- [x] Admin dashboard
- [x] Add product form
- [x] Edit/Delete products
- [x] Pagination
- [ ] Deploy to Render (do this last)

---

*Built by Ubaidullah Waheed — DevelopersHub Backend Intern, June 2025*
