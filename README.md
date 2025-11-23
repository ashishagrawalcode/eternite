# Éternité 🌸 | Luxury Fragrance E-Commerce

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Python](https://img.shields.io/badge/Python-Flask-blue)
![Frontend](https://img.shields.io/badge/Frontend-HTML%20%2F%20CSS%20%2F%20JS-orange)

**Éternité** is a fully responsive, luxury e-commerce web application designed for high-end fragrances. Built with a **Flask (Python)** backend and a custom **Vanilla JavaScript** frontend, it features a glassmorphism UI, physics-based animations, and persistent state management without a database.

---

## ✨ Key Features

### 🎨 UI/UX Design
- **Luxury Aesthetic:** Custom CSS using Gold (`#D4AF37`) and Charcoal color palette.
- **Glassmorphism:** Frosted glass navbar and modal effects.
- **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop with a custom hamburger menu.
- **Smooth Animations:** Cinematic entrance animations and smooth scrolling.

### 🛒 Shopping Experience
- **Interactive Cart & Wishlist:** Sidebar-based shopping experience with independent toggles.
- **Local Storage Persistence:** Cart and Wishlist items are saved even if the browser is refreshed.
- **Quick View Modal:** Click product images to view details in a popup without leaving the page.
- **Category Filtering:** Instantly filter products (Perfumes, Mists, Home) without reloading.

### ⚡ Interactions
- **"Magic Throw" Animation:** Items slide, rotate, and fade away visually when removed from the cart.
- **Simulated Checkout:** A cinematic checkout modal with a processing spinner and order confirmation.
- **Real-time Updates:** Cart badges and totals update dynamically.

---

## 🛠️ Tech Stack

* **Backend:** Python (Flask) - Serves templates and static assets.
* **Frontend:** HTML5, CSS3 (Custom variables, Flexbox, Grid), JavaScript (ES6+).
* **Server:** Gunicorn (for production).
* **Database:** None (Uses Browser `localStorage` for state).

---

## 📂 Project Structure

```text
Eternite_Project/
│
├── app.py                # Main Flask Application
├── requirements.txt      # Python Dependencies
├── README.md             # Project Documentation
│
├── static/               # Static Assets
│   ├── css/
│   │   └── style.css     # Main Stylesheet
│   ├── js/
│   │   └── script.js     # Logic (Cart, Wishlist, Animations)
│   └── images/
│       ├── hero-banner.jpg
│       └── products/     # Product Images
│
└── templates/
    └── index.html        # Main HTML Structure
