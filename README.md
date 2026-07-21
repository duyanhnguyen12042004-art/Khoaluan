
```
Khoaluan
├─ backend
│  ├─ .env
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ server.js
│  └─ src
│     ├─ app.js
│     ├─ config
│     │  └─ database.js
│     ├─ controllers
│     │  └─ authController.js
│     ├─ database
│     │  └─ db.json
│     ├─ middleware
│     │  └─ authMiddleware.js
│     ├─ models
│     ├─ routes
│     │  └─ authRoute.js
│     ├─ services
│     │  └─ authService.js
│     └─ utils
└─ frontend
   ├─ dist
   │  ├─ assets
   │  │  ├─ index-BdG59LFJ.js
   │  │  ├─ index-CZjB14Rr.css
   │  │  └─ logo-AHjKghlS.png
   │  ├─ favicon.svg
   │  ├─ icons.svg
   │  └─ index.html
   ├─ eslint.config.js
   ├─ index.html
   ├─ package-lock.json
   ├─ package.json
   ├─ public
   │  ├─ favicon.svg
   │  └─ icons.svg
   ├─ README.md
   ├─ src
   │  ├─ App.jsx
   │  ├─ assets
   │  │  ├─ images
   │  │  │  └─ logo.png
   │  │  └─ vite.svg
   │  ├─ component
   │  │  ├─ Footer
   │  │  │  ├─ Footer.jsx
   │  │  │  └─ Footer.scss
   │  │  ├─ Header
   │  │  │  ├─ Header.jsx
   │  │  │  └─ Header.scss
   │  │  └─ Sidebar
   │  │     ├─ Sidebar.jsx
   │  │     └─ Sidebar.scss
   │  ├─ hook
   │  ├─ index.css
   │  ├─ layouts
   │  │  ├─ AuthLayout.jsx
   │  │  └─ MainLayout.jsx
   │  ├─ main.jsx
   │  ├─ pages
   │  │  ├─ Dashboard
   │  │  │  ├─ Dashboard.jsx
   │  │  │  └─ Dashboard.scss
   │  │  ├─ Home
   │  │  │  ├─ Home.jsx
   │  │  │  └─ Home.scss
   │  │  ├─ Login
   │  │  │  ├─ Login.jsx
   │  │  │  └─ Login.scss
   │  │  └─ Register
   │  │     ├─ Register.jsx
   │  │     └─ Register.scss
   │  ├─ routes
   │  │  └─ AppRoutes.jsx
   │  ├─ services
   │  │  └─ authApi.js
   │  ├─ styles
   │  └─ utils
   └─ vite.config.js

```
```
Khoaluan
├─ backend
│  ├─ .env
│  ├─ hash.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ server.js
│  └─ src
│     ├─ app.js
│     ├─ config
│     │  └─ database.js
│     ├─ controllers
│     │  ├─ authController.js
│     │  ├─ orderController.js
│     │  ├─ productController.js
│     │  └─ userController.js
│     ├─ database
│     │  └─ db.json
│     ├─ middleware
│     │  └─ authMiddleware.js
│     ├─ models
│     ├─ routes
│     │  ├─ authRoute.js
│     │  ├─ orderRoute.js
│     │  ├─ productRoute.js
│     │  └─ userRoute.js
│     ├─ services
│     │  ├─ authService.js
│     │  ├─ orderService.js
│     │  ├─ productService.js
│     │  └─ userService.js
│     └─ utils
├─ frontend
│  ├─ dist
│  │  ├─ assets
│  │  │  ├─ index-BdG59LFJ.js
│  │  │  ├─ index-CZjB14Rr.css
│  │  │  └─ logo-AHjKghlS.png
│  │  ├─ favicon.svg
│  │  ├─ icons.svg
│  │  └─ index.html
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.svg
│  │  ├─ icons.svg
│  │  └─ images
│  │     ├─ product1.jpg
│  │     ├─ product2.jpg
│  │     ├─ product3.jpg
│  │     └─ product4.jpg
│  ├─ README.md
│  ├─ src
│  │  ├─ App.jsx
│  │  ├─ assets
│  │  │  ├─ images
│  │  │  │  ├─ banner
│  │  │  │  │  ├─ banner1.jpg
│  │  │  │  │  ├─ banner2.jpg
│  │  │  │  │  └─ banner3.jpg
│  │  │  │  ├─ icons
│  │  │  │  └─ logo.png
│  │  │  └─ vite.svg
│  │  ├─ component
│  │  │  ├─ Banner
│  │  │  │  ├─ Banner.jsx
│  │  │  │  └─ Banner.scss
│  │  │  ├─ Footer
│  │  │  │  ├─ Footer.jsx
│  │  │  │  └─ Footer.scss
│  │  │  ├─ Header
│  │  │  │  ├─ Header.jsx
│  │  │  │  └─ Header.scss
│  │  │  ├─ ProductCard
│  │  │  │  ├─ ProductCard.jsx
│  │  │  │  └─ ProductCard.scss
│  │  │  ├─ ProductGallery
│  │  │  │  ├─ ProductGallery.jsx
│  │  │  │  └─ ProductGallery.scss
│  │  │  ├─ ProductInfo
│  │  │  │  ├─ ProductInfo.jsx
│  │  │  │  └─ ProductInfo.scss
│  │  │  └─ Sidebar
│  │  │     ├─ Sidebar.jsx
│  │  │     └─ Sidebar.scss
│  │  ├─ context
│  │  │  ├─ AuthContext.jsx
│  │  │  └─ CartContext.jsx
│  │  ├─ data
│  │  │  └─ products.js
│  │  ├─ hook
│  │  ├─ index.css
│  │  ├─ layouts
│  │  │  ├─ AdminLayout
│  │  │  │  ├─ AdminLayout.jsx
│  │  │  │  └─ AdminLayout.scss
│  │  │  ├─ AuthLayout.jsx
│  │  │  └─ MainLayout.jsx
│  │  ├─ main.jsx
│  │  ├─ pages
│  │  │  ├─ AdminDashboard
│  │  │  │  ├─ AdminDashboard.jsx
│  │  │  │  └─ AdminDashboard.scss
│  │  │  ├─ AdminOrders
│  │  │  │  └─ AdminOrders.jsx
│  │  │  ├─ AdminProducts
│  │  │  │  ├─ AdminProducts.jsx
│  │  │  │  └─ AdminProducts.scss
│  │  │  ├─ AdminUsers
│  │  │  │  └─ AdminUsers.jsx
│  │  │  ├─ Cart
│  │  │  │  ├─ Cart.jsx
│  │  │  │  └─ Cart.scss
│  │  │  ├─ EditProfile
│  │  │  │  ├─ EditProfile.jsx
│  │  │  │  └─ EditProfile.scss
│  │  │  ├─ Home
│  │  │  │  ├─ Home.jsx
│  │  │  │  └─ Home.scss
│  │  │  ├─ Login
│  │  │  │  ├─ Login.jsx
│  │  │  │  └─ Login.scss
│  │  │  ├─ MyOrders
│  │  │  │  ├─ MyOrders.jsx
│  │  │  │  └─ MyOrders.scss
│  │  │  ├─ ProductDetail
│  │  │  │  ├─ ProductDetail.jsx
│  │  │  │  └─ ProductDetail.scss
│  │  │  ├─ Profile
│  │  │  │  ├─ Profile.jsx
│  │  │  │  └─ Profile.scss
│  │  │  └─ Register
│  │  │     ├─ Register.jsx
│  │  │     └─ Register.scss
│  │  ├─ routes
│  │  │  └─ AppRoutes.jsx
│  │  ├─ services
│  │  │  ├─ authApi.js
│  │  │  ├─ orderApi.js
│  │  │  ├─ productApi.js
│  │  │  └─ userApi.js
│  │  ├─ styles
│  │  └─ utils
│  └─ vite.config.js
└─ README.md

```