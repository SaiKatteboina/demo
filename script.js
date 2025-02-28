// Menu items data
const menuItems = [
    {
        id: 1,
        name: "Butter Chicken",
        category: "mains",
        price: 350,
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=60",
        description: "Tender chicken in rich tomato and butter gravy"
    },
    {
        id: 2,
        name: "Paneer Tikka",
        category: "starters",
        price: 250,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=60",
        description: "Grilled cottage cheese with spices"
    },
    {
        id: 3,
        name: "Garlic Naan",
        category: "breads",
        price: 40,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=60",
        description: "Traditional Indian bread with garlic"
    },
    {
        id: 4,
        name: "Gulab Jamun",
        category: "desserts",
        price: 120,
        image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=500&q=60",
        description: "Sweet milk dumplings in sugar syrup"
    },
    {
        id: 5,
        name: "Chicken Biryani",
        category: "mains",
        price: 300,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=60",
        description: "Fragrant rice with tender chicken and aromatic spices"
    },
    {
        id: 6,
        name: "Samosa",
        category: "starters",
        price: 80,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=60",
        description: "Crispy pastry filled with spiced potatoes"
    },
    {
        id: 7,
        name: "Tandoori Roti",
        category: "breads",
        price: 30,
        image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=500&q=60",
        description: "Whole wheat bread baked in tandoor"
    },
    {
        id: 8,
        name: "Rasmalai",
        category: "desserts",
        price: 150,
        image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=500&q=60",
        description: "Soft cottage cheese dumplings in sweet milk"
    }
];

// Cart state
let cart = [];

// DOM Elements
const menuItemsContainer = document.getElementById('menu-items');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const totalAmount = document.getElementById('total-amount');
const categoryButtons = document.querySelectorAll('.category-btn');

// Initialize the application
function init() {
    displayMenuItems('all');
    setupEventListeners();
}

// Display menu items based on category
function displayMenuItems(category) {
    const filteredItems = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);

    menuItemsContainer.innerHTML = filteredItems.map(item => `
        <div class="menu-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-info">
                <h3 class="menu-item-title">${item.name}</h3>
                <p>${item.description}</p>
                <p class="menu-item-price">₹${item.price}</p>
                <button class="add-to-cart" onclick="addToCart(${item.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Display items for selected category
            displayMenuItems(button.dataset.category);
        });
    });

    document.getElementById('checkout-btn').addEventListener('click', checkout);
}

// Add item to cart
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    updateCart();
    showNotification(`Added ${item.name} to cart`);
}

// Update cart display
function updateCart() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price} x ${item.quantity}</p>
            </div>
            <div>
                <button onclick="updateItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
        </div>
    `).join('');

    totalAmount.textContent = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Update item quantity in cart
function updateItemQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
        cart = cart.filter(item => item.id !== itemId);
    } else {
        const item = cart.find(item => item.id === itemId);
        item.quantity = newQuantity;
    }
    updateCart();
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    alert('Thank you for your order! Total amount: ₹' + totalAmount.textContent);
    cart = [];
    updateCart();
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
