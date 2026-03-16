# custom-e-commerce-system



## 📝 Description

A flexible and robust e-commerce platform built with Express.js, designed to provide a seamless online shopping experience. This custom system features a secure authentication module to ensure safe user access and a dynamic web interface, serving as a scalable foundation for modern digital storefronts.

## ✨ Features

- 🔐 Auth
- 🕸️ Web


## 🛠️ Tech Stack

- 🚀 Express.js


## 📦 Key Dependencies

```
bcrypt: ^6.0.0
cloudinary: ^2.9.0
cors: ^2.8.6
dotenv: ^17.3.1
express: ^5.2.1
jsonwebtoken: ^9.0.3
mongoose: ^9.2.4
multer: ^2.1.1
react-router-dom: ^7.13.1
```

## 🚀 Run Commands

- **start**: `npm run start`
- **dev**: `npm run dev`


## 📁 Project Structure

```
.
├── backend
│   ├── package.json
│   └── src
│       ├── admin
│       │   ├── controllers
│       │   │   ├── adminAnalyticsController.js
│       │   │   ├── adminAuthController.js
│       │   │   └── adminOrderController.js
│       │   ├── middlewares
│       │   │   └── adminAuthMiddleware.js
│       │   ├── routes
│       │   │   └── adminRoutes.js
│       │   ├── services
│       │   │   └── analyticsService.js
│       │   └── utils
│       │       └── generateAdminToken.js
│       ├── app.js
│       ├── config
│       │   ├── cloudinary.js
│       │   └── database.js
│       ├── middleware
│       │   ├── errorHandler.js
│       │   ├── requestLogger.js
│       │   └── upload.js
│       ├── modules
│       │   ├── auth
│       │   │   ├── auth.controller.js
│       │   │   ├── auth.middleware.js
│       │   │   ├── auth.routes.js
│       │   │   ├── auth.utils.js
│       │   │   └── user.model.js
│       │   ├── orders
│       │   │   ├── order.controller.js
│       │   │   ├── order.model.js
│       │   │   ├── order.routes.js
│       │   │   └── order.service.js
│       │   └── products
│       │       ├── product.controller.js
│       │       ├── product.model.js
│       │       ├── product.routes.js
│       │       └── product.service.js
│       └── server.js
└── frontend
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── src
    │   ├── App.css
    │   ├── App.jsx
    │   ├── assets
    │   │   ├── images
    │   │   │   └── hero-banner.jpg
    │   │   └── mockups
    │   │       ├── shirt-black.png
    │   │       ├── shirt-blue.png
    │   │       ├── shirt-red.png
    │   │       └── shirt-white.png
    │   ├── components
    │   │   ├── DesignCanvas.jsx
    │   │   ├── Header.jsx
    │   │   ├── ProductCard.jsx
    │   │   ├── TextControls.jsx
    │   │   ├── admin
    │   │   │   ├── AdminProtectedRoute.jsx
    │   │   │   ├── AdminSidebar.jsx
    │   │   │   ├── AnalyticsCard.jsx
    │   │   │   ├── ChartsSection.jsx
    │   │   │   └── OrdersPreviewTable.jsx
    │   │   ├── auth
    │   │   │   ├── AuthModal.jsx
    │   │   │   └── UserProtectedRoute.jsx
    │   │   ├── cart
    │   │   │   └── CartItem.jsx
    │   │   ├── common
    │   │   │   └── ScrollToTop.jsx
    │   │   ├── designer
    │   │   │   ├── ColorSelector.jsx
    │   │   │   ├── DesignToolbar.jsx
    │   │   │   └── ProductCanvas.jsx
    │   │   └── layout
    │   │       ├── CategoryRow.jsx
    │   │       ├── CustomProductSection.jsx
    │   │       ├── FeaturesSection.jsx
    │   │       ├── Footer.jsx
    │   │       ├── Header.jsx
    │   │       ├── HeroSection.jsx
    │   │       ├── ProductCatalog.jsx
    │   │       ├── ReviewSection.jsx
    │   │       └── UpcomingPremiumRow.jsx
    │   ├── index.css
    │   ├── layouts
    │   │   └── MainLayout.jsx
    │   ├── main.jsx
    │   ├── pages
    │   │   ├── Cart.jsx
    │   │   ├── Checkout.jsx
    │   │   ├── CustomizeProduct.jsx
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── OrderSuccess.jsx
    │   │   ├── ProductDetails.jsx
    │   │   ├── Signup.jsx
    │   │   └── admin
    │   │       ├── AdminDashboard.jsx
    │   │       ├── AdminLogin.jsx
    │   │       ├── OrderDetails.jsx
    │   │       └── OrdersList.jsx
    │   ├── services
    │   │   └── api.js
    │   └── utils
    │       └── cartStorage.js
    ├── vercel.json
    └── vite.config.js
```

## 👥 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/kuruet/custom-e-commerce-system.git`
3. **Create** a new branch: `git checkout -b feature/your-feature`
4. **Commit** your changes: `git commit -am 'Add some feature'`
5. **Push** to your branch: `git push origin feature/your-feature`
6. **Open** a pull request


