# BikzIK E-Commerce Platform

**BIKZIK** is a modern, full-stack e-commerce platform that offers seamless shopping experiences. It is built using the latest technologies with features like user authentication, product management, and cloud image storage.

---

# Table of Contents

- [BIKZIK E-Commerce Platform](#bikzik-e-commerce-platform)
- [🚀 Features](#-features)
  - [Admin Features](#admin-features)
    - [Category Management](#category-management)
    - [Product Management](#product-management)
    - [Order Management](#order-management)
  - [User Features](#user-features)
    - [User Profiles](#user-profiles)
    - [Shopping Cart](#shopping-cart)
    - [Checkout & Payments](#checkout--payments)
- [💳 Development Status](#development-status)
  - [Future Enhancements](#future-enhancements)
- [📂 Project Structure](#project-structure)
  - [Frontend (Client)](#frontend-client)
  - [Backend (Server)](#backend-server)
- [🛠️ Tech Stack](#-tech-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Other Tools & Libraries](#other-tools--libraries)
- [🚀 Deployment](#deployment)
- [📧 Contact](#contact)


---

## 🚀 Features

### Admin Features
  #### Category Management
  - Add new categories and subcategories.
  - Edit existing categories and subcategories.
  - Delete categories and subcategories.
  
  #### Product Management
  - Add new products under specific categories/subcategories.
  - Edit product details, including price, description, and availability.
  - Delete products from the catalog.
  
  #### Order Management
  - View all orders placed by users.
  - Update order statuses (e.g., pending, shipped, completed, or canceled).

### User Features
  #### User Profiles
  - Update personal profile details such as name, email, and password.
  - Manage saved addresses for delivery.
  
  #### Shopping Cart
  - Add products to the shopping cart.
  - View and update the shopping cart before checkout.
  
  #### Checkout & Payments
  - Choose between Cash on Delivery or Online Payment methods.
  - *Note*: Online payment functionality is still under development.

## 💳 Development Status
- **Admin Report**: Ongoing.
- **Online Payment Integration**: Ongoing.
  
  ### Future Enhancements
  - Admin reports for analytics and performance tracking.
  - Full integration of online payment methods.

---

## 📂 Project Structure

### Frontend (Client)
- **Framework**: React + Vite
- **Folder Structure**:
  - `assets`: Static assets like icons and images.
  - `components`: Reusable React components.
  - `hooks`: Custom React hooks.
  - `layouts`: Page layouts.
  - `pages`: Individual application pages.
  - `store`: Redux slices for state management.
  - `utils`: Helper functions.

### Backend (Server)
- **Framework**: Express.js
- **Folder Structure**:
  - `configs`: Configuration files for database and application.
  - `controllers`: Logic for handling requests.
  - `middlewares`: Custom middleware for authentication and validation.
  - `models`: MongoDB schemas.
  - `routes`: API endpoints.
  - `utils`: Helper utilities (e.g., error handling).

---

## 🛠️ Tech Stack

- **Frontend**:
  - React.js
  - Redux Toolkit
  - TailwindCSS
  - React Router
  - Axios
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (Mongoose)
  - JSON Web Token (JWT)
  - Cloudinary

- **Frontend**:
  - Frameworks & Libraries:
    - React.js (with Vite for blazing-fast development)
    - React Router (for navigation and routing)
    - Redux Toolkit (state management)

  - Styling:
    - TailwindCSS (utility-first CSS framework)

  - Utilities:
    - Axios (HTTP requests)

- **Backend**:
  - Frameworks:
    - Node.js
    - Express.js

  - Authentication:
    - bcryptjs (password hashing for secure authentication)
    - jsonwebtoken (JWT-based user authentication and session management)

  - Database:
    - MongoDB (NoSQL database)
    - Mongoose (ODM for MongoDB)

  - File Uploads:
    - multer (handling multipart/form-data uploads)
    - Cloudinary (cloud storage for images)

  - Email Sending:
    - resend (email API for notifications and verification)

- **Other Tools & Libraries**:
  - dotenv (environment variable management)
  - helmet (enhancing API security with HTTP headers)
  - cors (cross-origin resource sharing)
  - morgan (HTTP request logging)
  - postman (Test APIs by http request)

---

## 🚀 Deployment
  - Frontend: Deployed on Vercel.
    - URL: https://bikzik.vercel.app
  - Backend: Deployed on Vercel.
    - URL: https://bikzikserver.vercel.app

---

## 📧 Contact
  - Email: buddikakasun80@gmail.com


