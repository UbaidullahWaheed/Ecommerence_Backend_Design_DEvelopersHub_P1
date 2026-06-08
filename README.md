<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f0c29,50:302b63,100:24243e&height=220&section=header&text=ShopVerse&fontSize=90&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=⚡%20Full-Stack%20eCommerce%20Backend&descAlignY=60&descSize=24&descColor=a78bfa" width="100%"/>
</div>

<br/>

<div align="center">

  <a href="#"><img src="https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Express.js-4.18-000000?style=for-the-badge&logo=express&logoColor=white" /></a>
  <a href="#"><img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" /></a>
  <a href="#"><img src="https://img.shields.io/badge/EJS-Templating-B4CA65?style=for-the-badge&logo=javascript&logoColor=black" /></a>
  <a href="#"><img src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" /></a>
  <a href="#"><img src="https://img.shields.io/badge/License-ISC-8b5cf6?style=for-the-badge" /></a>

  <br/><br/>

  <img src="https://img.shields.io/github/stars/yourusername/shopverse?style=social" />
  &nbsp;
  <img src="https://img.shields.io/github/forks/yourusername/shopverse?style=social" />
  &nbsp;
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square" />

</div>

<br/>

<div align="center">
  <h3>🛒 A production-ready eCommerce backend with JWT auth, admin panel,<br/>real-time search, filtering & pagination — no Mongoose required.</h3>
</div>

---

## 📸 Screenshots

<div align="center">

| 🏠 Homepage | 🛍️ Product Listing |
|:-----------:|:------------------:|
| ![Home](https://placehold.co/500x300/0f0c29/a78bfa?text=🏠+Homepage&font=montserrat) | ![Products](https://placehold.co/500x300/1e1b4b/818cf8?text=🛍️+Products&font=montserrat) |

| 🔍 Search & Filter | ⚙️ Admin Dashboard |
|:------------------:|:------------------:|
| ![Search](https://placehold.co/500x300/1e1b4b/c4b5fd?text=🔍+Search+%26+Filter&font=montserrat) | ![Admin](https://placehold.co/500x300/0f0c29/7c3aed?text=⚙️+Admin+Panel&font=montserrat) |

> 💡 **Replace these placeholders** with real screenshots after deployment!

</div>

---

## ✨ Features at a Glance

<table>
  <tr>
    <td>

### 🧑‍💻 User-Facing
- 🏠 Dynamic homepage with featured & latest products
- 🔍 Live search across product names & descriptions
- 🗂️ Category-based filtering (Electronics, Clothing, etc.)
- 🔃 Sort by price ↑↓, rating, or newest
- 📄 Server-side pagination (12 items/page)
- 📱 Fully mobile-responsive layout
- ⚡ Flash messages for instant feedback

    </td>
    <td>

### 🔐 Auth & Admin
- 🔑 JWT-based stateless authentication
- 🧂 bcrypt password hashing (never plain-text)
- 🛡️ Role-based access control (User / Admin)
- 📊 Admin dashboard — product stats at a glance
- ➕ Create · ✏️ Edit · 🗑️ Delete products
- 🗄️ File-based JSON data store (no DB setup needed)
- 🔒 Protected admin routes via middleware guards

    </td>
  </tr>
</table>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser (EJS)                        │
└───────────────────────────┬─────────────────────────────────┘
                            │  HTTP
┌───────────────────────────▼─────────────────────────────────┐
│               Express.js Application (app.js)               │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  authRoutes  │  │ productRoutes│  │   adminRoutes    │  │
│  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘  │
│         │                 │                    │            │
│  ┌──────▼───────┐  ┌──────▼───────┐  ┌────────▼─────────┐  │
│  │authController│  │  productCtrl │  │   adminController│  │
│  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘  │
│         │                 │                    │            │
│  ┌──────▼─────────────────▼────────────────────▼─────────┐  │
│  │               Models  (User.js · Product.js)          │  │
│  └──────────────────────────┬────────────────────────────┘  │
│                             │                               │
│  ┌──────────────────────────▼────────────────────────────┐  │
│  │           JSON File Store  (data/*.json)               │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Version | Role |
|:------|:----------:|:-------:|:-----|
| **Runtime** | Node.js | 18+ | JavaScript server environment |
| **Framework** | Express.js | 4.18 | Routing, middleware, server |
| **Templating** | EJS | 3.1 | Server-side HTML rendering |
| **Auth** | jsonwebtoken | 9.0 | Stateless JWT tokens |
| **Security** | bcryptjs | 2.4 | Password hashing & salting |
| **Sessions** | express-session | 1.17 | User session management |
| **Messaging** | connect-flash | 0.1 | One-time flash notifications |
| **Forms** | method-override | 3.0 | PUT/DELETE from HTML forms |
| **Config** | dotenv | 16.3 | Environment variable loading |
| **Dev** | nodemon | 3.0 | Auto-restart during development |

</div>

---

## 🚀 Getting Started

### ✅ Prerequisites

Make sure you have the following installed:

```bash
node --version    # v18 or higher
npm --version     # v9 or higher
```

---

### 📦 Installation

**1 · Clone the repository**

```bash
git clone https://github.com/yourusername/shopverse.git
cd shopverse
```

**2 · Install dependencies**

```bash
npm install
```

**3 · Configure your environment**

```bash
# The .env file is already included — open it and update:
MONGODB_URI=your_mongodb_connection_string   # optional, uses JSON files by default
SESSION_SECRET=pick_a_long_random_string
JWT_SECRET=another_long_random_string
PORT=3000
```

> 💡 This project uses a **JSON file-based data store** by default — no MongoDB setup required to get started!

**4 · Seed sample data**

```bash
node seedDB.js
```

This loads ~500 sample products and creates two test accounts:

<div align="center">

| Role | Email | Password |
|:----:|:------|:--------|
| 👑 **Admin** | `admin@shopverse.com` | `admin123` |
| 👤 **User** | `user@shopverse.com` | `user123` |

</div>

**5 · Start the server**

```bash
npm run dev      # 🔥 Development (auto-restarts on save)
npm start        # 🚀 Production
```

**6 · Visit in browser**

```
http://localhost:3000
```

---

## 📁 Project Structure

```
shopverse/
│
├── 📂 config/
│   └── db.js                     ← Database connection helper
│
├── 📂 controllers/
│   ├── authController.js         ← Login · Signup · Logout logic
│   ├── productController.js      ← Listing · Detail · Search · Filter
│   └── adminController.js        ← CRUD operations for products
│
├── 📂 middleware/
│   └── authMiddleware.js         ← requireLogin · requireAdmin guards
│
├── 📂 models/
│   ├── Product.js                ← Product class (find · create · update · delete)
│   └── User.js                   ← User model with bcrypt hashing
│
├── 📂 routes/
│   ├── authRoutes.js             ← /login  /signup  /logout
│   ├── productRoutes.js          ← /products  /products/:id
│   └── adminRoutes.js            ← /admin/** (all protected)
│
├── 📂 views/
│   ├── partials/
│   │   ├── header.ejs            ← Navbar · Flash messages · Auth state
│   │   └── footer.ejs            ← Footer · Scripts
│   ├── auth/
│   │   ├── login.ejs
│   │   └── signup.ejs
│   ├── admin/
│   │   ├── dashboard.ejs         ← Stats overview
│   │   ├── products.ejs          ← Product management table
│   │   ├── add-product.ejs
│   │   └── edit-product.ejs
│   ├── index.ejs                 ← Homepage (featured + latest)
│   ├── products.ejs              ← Listing · Search · Filter · Sort · Pagination
│   ├── product.ejs               ← Single product detail
│   ├── 404.ejs
│   └── error.ejs
│
├── 📂 public/
│   ├── css/style.css             ← Full responsive stylesheet (~47KB)
│   └── js/main.js                ← Client-side interactivity
│
├── 📂 data/
│   ├── products.json             ← 500 seed products (~494KB)
│   └── users.json                ← Seed user accounts
│
├── app.js                        ← 🚀 Main server entry point
├── seedDB.js                     ← Database seeder script
├── .env                          ← Environment variables ⚠️ never commit!
├── .gitignore
├── package.json
└── README.md
```

---

## 🌐 Routes Reference

<details>
<summary><b>🛍️ Storefront Routes</b> — click to expand</summary>
<br/>

| Method | Route | Description | Auth Required |
|:------:|:------|:------------|:-------------:|
| `GET` | `/` | Homepage with featured & latest products | ❌ |
| `GET` | `/products` | Full product listing | ❌ |
| `GET` | `/products?search=shoes` | Search by name or description | ❌ |
| `GET` | `/products?category=electronics` | Filter by category | ❌ |
| `GET` | `/products?sort=price_asc` | Sort products | ❌ |
| `GET` | `/products?page=2` | Paginate results | ❌ |
| `GET` | `/products/:id` | Single product detail page | ❌ |

</details>

<details>
<summary><b>🔐 Authentication Routes</b> — click to expand</summary>
<br/>

| Method | Route | Description | Auth Required |
|:------:|:------|:------------|:-------------:|
| `GET` | `/login` | Render login form | ❌ |
| `POST` | `/login` | Authenticate user, set JWT session | ❌ |
| `GET` | `/signup` | Render signup form | ❌ |
| `POST` | `/signup` | Register new user account | ❌ |
| `GET` | `/logout` | Destroy session and redirect | ✅ User |

</details>

<details>
<summary><b>⚙️ Admin Routes</b> — click to expand</summary>
<br/>

| Method | Route | Description | Auth Required |
|:------:|:------|:------------|:-------------:|
| `GET` | `/admin` | Admin dashboard with stats | 👑 Admin |
| `GET` | `/admin/products` | List all products | 👑 Admin |
| `GET` | `/admin/products/new` | Render add-product form | 👑 Admin |
| `POST` | `/admin/products` | Create new product | 👑 Admin |
| `GET` | `/admin/products/:id/edit` | Render edit-product form | 👑 Admin |
| `PUT` | `/admin/products/:id` | Update existing product | 👑 Admin |
| `DELETE` | `/admin/products/:id` | Delete a product | 👑 Admin |

</details>

---

## ☁️ Deployment (Render)

```bash
# 1. Make sure .env is in .gitignore, then push to GitHub
git add .
git commit -m "ready for deployment"
git push origin main

# 2. Go to https://render.com → New Web Service
# 3. Connect your GitHub repository
# 4. Set the following:
#      Build Command:  npm install
#      Start Command:  npm start
# 5. Add your environment variables in the Render dashboard
# 6. Hit Deploy 🚀
```

> ⚠️ **Never commit your `.env` file.** Add it to `.gitignore` before your first push.

---

## 🗺️ Roadmap

```
✅ Phase 1 — Core Backend
   ✅ Express server + EJS views
   ✅ Product listing, detail, search, filter, sort
   ✅ Pagination

✅ Phase 2 — Database & Data
   ✅ JSON file-based data model
   ✅ 500 seed products via seedDB.js

✅ Phase 3 — Auth & Admin
   ✅ JWT authentication
   ✅ bcrypt password hashing
   ✅ Role-based middleware
   ✅ Admin CRUD panel

🔲 Phase 4 — Coming Soon
   🔲 Deploy to Render
   🔲 Shopping cart & checkout flow
   🔲 Order management system
   🔲 Product image uploads (Cloudinary)
   🔲 REST API / JSON endpoints
   🔲 Email notifications (Nodemailer)
   🔲 Migrate to MongoDB Atlas
```

---

## 🤝 Contributing

All contributions are welcome — big or small!

```bash
# 1. Fork this repository
# 2. Create your feature branch
git checkout -b feature/your-feature-name

# 3. Make your changes and commit
git commit -m "feat: add your feature"

# 4. Push and open a Pull Request
git push origin feature/your-feature-name
```

---

## 📄 License

Distributed under the **ISC License**. See [`LICENSE`](./LICENSE) for details.

---

<div align="center">

  <br/>

  Made with 💜 by **[Ubaidullah Waheed](https://github.com/UbaidullahWaheed)**

  *DevelopersHub Backend Internship · June 2025*

  <br/>

  <a href="#top">⬆️ Back to top</a>

  <br/>

  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:24243e,50:302b63,100:0f0c29&height=120&section=footer" width="100%"/>

</div>
