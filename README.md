# E-Commerce Shop Application

A modern, responsive e-commerce web application built with **React** and **Vite**. The application fetches live product data from the DummyJSON API and provides a complete storefront experience including category-based filtering, text search, persistent shopping cart management, and mock user login.

## Features

- **Live Product Feed**: Fetches and renders up to 50 real-time products dynamically from `https://dummyjson.com/products`.
- **Advanced Sidebar Filters**:
  - **Price Range Slider**: Filter products by custom maximum price bounds.
  - **Customer Rating**: Filter items with rating thresholds (e.g., 4★ & above).
  - **Category Filters**: Multi-select checkbox filters to browse specific categories.
- **Search Bar**: Quick character matching across titles and category names.
- **Persistent Shopping Cart**:
  - Automatically groups duplicate cart items and handles quantity adjustments.
  - Computes detailed price receipts showing original pricing, discount savings, and final checkout totals.
  - Saves the shopping cart state to browser local storage so items remain after reload.
- **Mock Authentication**: Simulates user logins and logouts with profile headers stored in session states.

---

## File Structure

```text
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and local media
│   ├── App.css             # Main application layout styles
│   ├── App.jsx             # React router setup and page routes
│   ├── Home.css            # Styles for home, cart, and authentication pages
│   ├── cart.jsx            # Shopping cart management & checkout UI
│   ├── home.jsx            # Product store feed, search, and sidebar filters
│   ├── login.jsx           # Simulated user login portal
│   ├── main.jsx            # React root component initialization
│   └── index.css           # Global stylesheet and base elements
├── package.json            # Dependencies and scripts definitions
├── vite.config.js          # Vite build system configuration
└── eslint.config.js        # Code quality lint rules
```

---

## Installation & Setup

To run this project locally, ensure you have [Node.js](https://nodejs.org/) installed, and then follow these steps:

### 1. Install Dependencies
Open your terminal in the project directory and run:
```bash
npm install
```

### 2. Start the Development Server
Launch the local development environment:
```bash
npm run dev
```
Once started, the terminal will output a local URL (usually `http://localhost:5173`) where you can preview the application in your browser.

### 3. Production Build
To bundle the application into static files optimized for deployment:
```bash
npm run build
```
You can preview the built production app locally using:
```bash
npm run preview
```
