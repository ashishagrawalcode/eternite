/* =========================================
   1. DATA & STATE
   ========================================= */
const products = [
    // PERFUMES
    { id: 1, name: "Éternité Fleur", category: "Perfume", price: 799, notes: "Rose • Jasmine • Vanilla", img: "/static/images/products/Eternite-Fleur.jpg" },
    { id: 2, name: "Éternité Noir", category: "Perfume", price: 899, notes: "Amber • Musk • Oud", img: "/static/images/products/Eternite-noir.jpg" },
    { id: 3, name: "Éternité Lumière", category: "Perfume", price: 849, notes: "Citrus • Bergamot", img: "/static/images/products/Eternite-lumiere.jpg" },
    { id: 4, name: "Éternité Royale", category: "Perfume", price: 1199, notes: "Saffron • Patchouli", img: "/static/images/products/Eternite-royale.jpg" },
    { id: 5, name: "Éternité Marine", category: "Perfume", price: 799, notes: "Sea Salt • Driftwood", img: "/static/images/products/Eternite-marine.jpg" },
    { id: 6, name: "Café Parisien", category: "Perfume", price: 899, notes: "Coffee • Caramel", img: "/static/images/products/Eternite-parisien.jpg" },
    { id: 7, name: "Éternité Blossom", category: "Perfume", price: 749, notes: "Cherry Blossom • Peach", img: "/static/images/products/Eternite-blossom.jpg" },
    { id: 8, name: "Homme Classique", category: "Perfume", price: 999, notes: "Cedar • Vetiver", img: "/static/images/products/Eternite-hommie.jpg" },

    // OTHER CATEGORIES
    { id: 9, name: "Peach Mist", category: "Mist", price: 349, notes: "Fruity • Sweet", img: "" },
    { id: 10, name: "Vanilla Lotion", category: "Lotion", price: 499, notes: "Hydrating • Soft", img: "" },
    { id: 11, name: "Rose Candle", category: "Home", price: 599, notes: "Soy Wax • 40hr", img: "" }
];

// State Management
let cart = JSON.parse(localStorage.getItem('eternite-cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('eternite-wishlist')) || [];

/* =========================================
   2. RENDER & FILTER
   ========================================= */
function filterProducts(category, btnElement) {
    // 1. Update UI (Active Button)
    if(btnElement) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        btnElement.classList.add('active');
    }

    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    
    // 2. Filter Logic
    const filtered = category === 'All' 
        ? products 
        : products.filter(p => p.category === category);

    // 3. Render
    const elegantFallback = "https://placehold.co/400x500/F4F1EA/121212?text=Éternité&font=playfair-display";

    if (filtered.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 40px; color:#999;">No products found in this category.</div>';
        return;
    }

    filtered.forEach(p => {
        const isLiked = wishlist.includes(p.id) ? 'liked' : '';

        const div = document.createElement('div');
        div.className = 'product-card fade-in';
        div.innerHTML = `
            <div class="product-img-container">
                <img src="${p.img}" 
                     alt="${p.name}" 
                     class="product-img" 
                     onerror="this.onerror=null; this.src='${elegantFallback}'">
                
                <button class="wishlist-btn ${isLiked}" onclick="toggleProductLike(${p.id}, this)" title="Add to Wishlist">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
            <div class="product-info">
                <span class="product-cat">${p.category}</span>
                <h3 class="product-title">${p.name}</h3>
                <p class="product-notes" style="font-size:0.8rem; color:#888; margin-bottom:5px;">${p.notes}</p>
                <p class="product-price">₹${p.price}</p>
            </div>
            <button onclick="addToCart(${p.id})" class="add-btn">Add to Cart</button>
        `;
        grid.appendChild(div);
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});

/* =========================================
   3. CART FUNCTIONS
   ========================================= */
function addToCart(id) {
    const item = cart.find(i => i.id === id);
    if(item) item.qty++;
    else cart.push({id, qty: 1});
    updateCart();
    toggleCart(true); // Open Cart
}

function updateCart() {
    localStorage.setItem('eternite-cart', JSON.stringify(cart));
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const countEl = document.getElementById('cart-count');
    
    container.innerHTML = '';
    let total = 0;
    let count = 0;

    if(cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#999; margin-top:40px;">Your cart is empty.</p>';
    }

    cart.forEach((item, idx) => {
        const prod = products.find(p => p.id === item.id);
        total += prod.price * item.qty;
        count += item.qty;
        
        const imgPath = prod.img ? prod.img : "https://placehold.co/100x100/F4F1EA/121212?text=E";

        container.innerHTML += `
            <div style="display:flex; gap:15px; margin-bottom:20px; align-items:center;">
                <img src="${imgPath}" style="width:60px; height:60px; object-fit:cover; border:1px solid #f0f0f0;">
                <div style="flex:1;">
                    <h4 style="font-family:var(--font-heading); margin-bottom:4px;">${prod.name}</h4>
                    <small style="color:#666;">₹${prod.price} x ${item.qty}</small>
                </div>
                <button onclick="animateRemoveCart(${idx}, this)" style="border:none; background:transparent; cursor:pointer; padding:5px; font-size:1.2rem; color:#ccc;">&times;</button>
            </div>
        `;
    });

    totalEl.innerText = '₹' + total;
    countEl.innerText = count;
}

function removeFromCart(idx) {
    cart.splice(idx, 1);
    updateCart();
}

// TOGGLE CART (Fix: Ensures Wishlist closes)
function toggleCart(open) {
    const body = document.body;
    if(open) {
        body.classList.add('cart-open');
        body.classList.remove('wishlist-open'); // Force close wishlist
    } else {
        body.classList.remove('cart-open');
    }
}

/* =========================================
   4. WISHLIST FUNCTIONS
   ========================================= */
function toggleProductLike(id, btn) {
    btn.classList.toggle('liked');
    
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(itemId => itemId !== id);
    } else {
        wishlist.push(id);
        // Animation pop
        btn.style.transform = "scale(1.2)";
        setTimeout(() => btn.style.transform = "scale(1)", 200);
    }

    localStorage.setItem('eternite-wishlist', JSON.stringify(wishlist));
    updateNavbarWishlist();
}

function updateNavbarWishlist() {
    const navHeart = document.querySelector('.icon-btn[title="Wishlist"]');
    if(navHeart) {
        if(wishlist.length > 0) navHeart.classList.add('has-items');
        else navHeart.classList.remove('has-items');
    }
}

// Navbar Toggle (Icon Click)
function toggleWishlist(btn) {
    toggleWishlistSidebar(true);
}

// TOGGLE WISHLIST SIDEBAR (Fix: Ensures Cart closes)
function toggleWishlistSidebar(open) {
    const body = document.body;
    if(open) {
        renderWishlistItems();
        body.classList.add('wishlist-open');
        body.classList.remove('cart-open'); // Force close cart
    } else {
        body.classList.remove('wishlist-open');
    }
}

function renderWishlistItems() {
    const container = document.getElementById('wishlist-items');
    container.innerHTML = '';

    if (wishlist.length === 0) {
        container.innerHTML = '<div style="text-align:center; color:#999; margin-top:50px;"><p>Your wishlist is empty.</p></div>';
        return;
    }

    wishlist.forEach(id => {
        const prod = products.find(p => p.id === id);
        
        if(prod) {
            const imgPath = prod.img ? prod.img : "https://placehold.co/100x100/F4F1EA/121212?text=E";

            container.innerHTML += `
                <div style="display:flex; gap:15px; margin-bottom:20px; align-items:center; border-bottom:1px solid #f9f9f9; padding-bottom:15px;">
                    <img src="${imgPath}" style="width:70px; height:70px; object-fit:cover; border:1px solid #f0f0f0;">
                    
                    <div style="flex:1;">
                        <h4 style="font-family:var(--font-heading); margin-bottom:4px;">${prod.name}</h4>
                        <p style="color:var(--gold); font-weight:600; font-size:0.9rem;">₹${prod.price}</p>
                        <button onclick="moveWishlistToCart(${prod.id})" style="margin-top:5px; background:var(--charcoal); color:white; border:none; padding:5px 10px; font-size:0.7rem; cursor:pointer; text-transform:uppercase;">Add to Bag</button>
                    </div>
                    
                    <button onclick="animateRemoveWishlist(${prod.id}, this)" style="border:none; background:transparent; cursor:pointer; color:#999;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                </div>
            `;
        }
    });
}

function moveWishlistToCart(id) {
    addToCart(id); 
    renderWishlistItems();
}

/* =========================================
   5. MAGIC ANIMATION (Visual Only)
   ========================================= */

// Animate & Remove from Cart
function animateRemoveCart(index, btnElement) {
    // 1. Find the row
    const row = btnElement.closest('div');
    
    // 2. Add the CSS Animation Class
    row.classList.add('magic-vanish');

    // 3. Wait 600ms for the animation to finish, then remove data
    setTimeout(() => {
        removeFromCart(index);
    }, 600);
}

// Animate & Remove from Wishlist
function animateRemoveWishlist(id, btnElement) {
    const row = btnElement.closest('div');
    
    row.classList.add('magic-vanish');

    setTimeout(() => {
        toggleProductLike(id, btnElement); 
        renderWishlistItems();
    }, 600);
}

/* =========================================
   6. CHECKOUT SIMULATION
   ========================================= */
function processCheckout() {
    // 1. Check if cart is empty
    if(cart.length === 0) {
        alert("Your bag is empty, darling.");
        return;
    }

    // 2. Close the cart sidebar
    toggleCart(false);

    // 3. Open the Checkout Modal
    const modal = document.getElementById('checkout-modal');
    const loading = document.getElementById('checkout-loading');
    const success = document.getElementById('checkout-success');
    
    // Reset state
    loading.style.display = 'block';
    success.style.display = 'none';
    modal.classList.add('active');

    // 4. Simulate API Wait Time (2.5 seconds)
    setTimeout(() => {
        // Hide loader, show success
        loading.style.display = 'none';
        success.style.display = 'block';

        // Generate Random Order ID
        const orderId = Math.floor(100000 + Math.random() * 900000);
        document.getElementById('order-id').innerText = '#' + orderId;

        // 5. CLEAR CART
        cart = [];
        localStorage.setItem('eternite-cart', JSON.stringify(cart));
        updateCart(); // Updates the UI to show 0 items

    }, 2500);
}

function closeCheckout() {
    document.getElementById('checkout-modal').classList.remove('active');
}

/* =========================================
   7. MOBILE MENU LOGIC
   ========================================= */
function toggleMobileMenu() {
    const navLinks = document.getElementById('nav-links');
    const overlay = document.getElementById('mobile-menu-overlay');
    const body = document.body;

    // Toggle Class
    navLinks.classList.toggle('active');
    
    // Toggle Overlay Visibility
    if (navLinks.classList.contains('active')) {
        body.classList.add('mobile-menu-open');
        body.style.overflow = 'hidden'; // Stop scrolling
    } else {
        body.classList.remove('mobile-menu-open');
        body.style.overflow = 'auto'; // Resume scrolling
    }
}

/* =========================================
   8. INIT
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    // Corrected filter syntax
    filterProducts('All', document.querySelector('.filter-btn.active'));
    updateCart();
    updateNavbarWishlist();
});