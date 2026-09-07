"use strict";

/* =========================================================
   FURZO E-COMMERCE
   CLEAN COMPLETE JAVASCRIPT
   ========================================================= */


/* =========================================================
   STORAGE
   ========================================================= */

const CART_STORAGE_KEY = "furzo_cart";
const ADDRESS_STORAGE_KEY = "furzo_address";
const ORDER_STORAGE_KEY = "furzo_orders";


/* =========================================================
   STATE
   ========================================================= */

let cart = [];
let currentCategory = "All";
let currentSearch = "";
let selectedProduct = null;
let toastTimer = null;


/* =========================================================
   PRODUCT DATA
   ========================================================= */

const products = [

    /* =====================================================
       FRUITS
       ===================================================== */

    {
        id: 1,
        name: "Fresh Bananas",
        category: "Fruits",
        price: 45,
        unit: "1 kg",
        image: "images/banana.jpg",
        images: [
            "images/banana.jpg"
        ],
        icon: "🍌",
        discount: 10,
        rating: 4.5,
        stock: 50,
        description: "Fresh and naturally sweet bananas."
    },

    {
        id: 2,
        name: "Shimla Apples",
        category: "Fruits",
        price: 129,
        unit: "4 pcs",
        image: "images/apples.jpg",
        images: [
            "images/apples.jpg",
            "images/apples-2.jpg",
            "images/apples-3.jpg",
            "images/apples-4.jpg"
        ],
        icon: "🍎",
        discount: 15,
        rating: 4.6,
        stock: 30,
        description: "Fresh and crunchy Shimla apples."
    },

    {
        id: 3,
        name: "Fresh Mango",
        category: "Fruits",
        price: 199,
        unit: "1 kg",
        image: "images/mango.jpg",
        images: [
            "images/mango.jpg"
        ],
        icon: "🥭",
        discount: 10,
        rating: 4.8,
        stock: 25,
        description: "Sweet and juicy seasonal mangoes."
    },


    /* =====================================================
       VEGETABLES
       ===================================================== */

    {
        id: 4,
        name: "Tomato",
        category: "Vegetables",
        price: 39,
        unit: "1 kg",
        icon: "🍅",
        discount: 5,
        rating: 4.4,
        stock: 60,
        description: "Fresh red tomatoes."
    },

    {
        id: 5,
        name: "Potato",
        category: "Vegetables",
        price: 35,
        unit: "1 kg",
        icon: "🥔",
        discount: 5,
        rating: 4.3,
        stock: 80,
        description: "Fresh everyday potatoes."
    },

    {
        id: 6,
        name: "Onion",
        category: "Vegetables",
        price: 42,
        unit: "1 kg",
        icon: "🧅",
        discount: 8,
        rating: 4.4,
        stock: 70,
        description: "Fresh quality onions."
    },

    {
        id: 7,
        name: "Green Capsicum",
        category: "Vegetables",
        price: 49,
        unit: "500 g",
        icon: "🫑",
        discount: 10,
        rating: 4.5,
        stock: 40,
        description: "Fresh green capsicum."
    },

    {
        id: 8,
        name: "Carrot",
        category: "Vegetables",
        price: 35,
        unit: "500 g",
        icon: "🥕",
        discount: 5,
        rating: 4.4,
        stock: 45,
        description: "Fresh crunchy carrots."
    },

    {
        id: 9,
        name: "Cucumber",
        category: "Vegetables",
        price: 29,
        unit: "500 g",
        icon: "🥒",
        discount: 5,
        rating: 4.3,
        stock: 50,
        description: "Fresh cucumbers."
    },

    {
        id: 10,
        name: "Sweet Corn",
        category: "Vegetables",
        price: 49,
        unit: "2 pcs",
        icon: "🌽",
        discount: 10,
        rating: 4.6,
        stock: 35,
        description: "Fresh sweet corn."
    },


    /* =====================================================
       DAIRY
       ===================================================== */

    {
        id: 11,
        name: "Amul Taaza Milk",
        category: "Dairy & Breakfast",
        price: 58,
        unit: "1 L",
        icon: "🥛",
        discount: 3,
        rating: 4.7,
        stock: 100,
        description: "Fresh dairy milk for everyday use."
    },

    {
        id: 12,
        name: "Amul Gold Milk",
        category: "Dairy & Breakfast",
        price: 68,
        unit: "1 L",
        icon: "🥛",
        discount: 3,
        rating: 4.8,
        stock: 100,
        description: "Rich and creamy milk."
    },

    {
        id: 13,
        name: "Fresh Paneer",
        category: "Dairy & Breakfast",
        price: 89,
        unit: "200 g",
        icon: "🧀",
        discount: 8,
        rating: 4.7,
        stock: 45,
        description: "Soft fresh paneer."
    },

    {
        id: 14,
        name: "Farm Eggs",
        category: "Dairy & Breakfast",
        price: 55,
        unit: "6 pcs",
        icon: "🥚",
        discount: 5,
        rating: 4.6,
        stock: 60,
        description: "Fresh farm eggs."
    },

    {
        id: 15,
        name: "Farm Eggs",
        category: "Dairy & Breakfast",
        price: 105,
        unit: "12 pcs",
        icon: "🥚",
        discount: 8,
        rating: 4.7,
        stock: 60,
        description: "Fresh farm eggs pack."
    },

    {
        id: 16,
        name: "Butter",
        category: "Dairy & Breakfast",
        price: 62,
        unit: "100 g",
        icon: "🧈",
        discount: 5,
        rating: 4.6,
        stock: 40,
        description: "Creamy dairy butter."
    },

    {
        id: 17,
        name: "Cheese Slices",
        category: "Dairy & Breakfast",
        price: 145,
        unit: "200 g",
        icon: "🧀",
        discount: 10,
        rating: 4.7,
        stock: 35,
        description: "Smooth cheese slices."
    },

    {
        id: 18,
        name: "Oats",
        category: "Dairy & Breakfast",
        price: 149,
        unit: "1 kg",
        icon: "🥣",
        discount: 15,
        rating: 4.5,
        stock: 50,
        description: "Healthy oats for breakfast."
    },


    /* =====================================================
       MUNCHIES
       ===================================================== */

    {
        id: 19,
        name: "Lay's Classic Salted",
        category: "Munchies",
        price: 20,
        unit: "52 g",
        icon: "🥔",
        discount: 0,
        rating: 4.5,
        stock: 100,
        description: "Classic salted potato chips."
    },

    {
        id: 20,
        name: "Kurkure Masala Munch",
        category: "Munchies",
        price: 30,
        unit: "90 g",
        icon: "🌶️",
        discount: 0,
        rating: 4.6,
        stock: 100,
        description: "Crunchy masala snack."
    },

    {
        id: 21,
        name: "Haldiram's Aloo Bhujia",
        category: "Munchies",
        price: 65,
        unit: "200 g",
        icon: "🥨",
        discount: 10,
        rating: 4.7,
        stock: 50,
        description: "Popular Indian namkeen."
    },

    {
        id: 22,
        name: "Roasted Makhana",
        category: "Munchies",
        price: 129,
        unit: "100 g",
        icon: "🥜",
        discount: 15,
        rating: 4.5,
        stock: 40,
        description: "Crunchy roasted makhana."
    },

    {
        id: 23,
        name: "Popcorn",
        category: "Munchies",
        price: 45,
        unit: "100 g",
        icon: "🍿",
        discount: 5,
        rating: 4.4,
        stock: 60,
        description: "Perfect movie-time popcorn."
    },


    /* =====================================================
       DRINKS
       ===================================================== */

    {
        id: 24,
        name: "Coca-Cola",
        category: "Cold Drinks & Juices",
        price: 40,
        unit: "750 ml",
        icon: "🥤",
        discount: 0,
        rating: 4.6,
        stock: 80,
        description: "Refreshing chilled soft drink."
    },

    {
        id: 25,
        name: "Pepsi",
        category: "Cold Drinks & Juices",
        price: 40,
        unit: "750 ml",
        icon: "🥤",
        discount: 0,
        rating: 4.5,
        stock: 80,
        description: "Refreshing cola drink."
    },

    {
        id: 26,
        name: "Sprite",
        category: "Cold Drinks & Juices",
        price: 40,
        unit: "750 ml",
        icon: "🥤",
        discount: 0,
        rating: 4.5,
        stock: 80,
        description: "Lemon-lime refreshing drink."
    },

    {
        id: 27,
        name: "Frooti",
        category: "Cold Drinks & Juices",
        price: 55,
        unit: "1 L",
        icon: "🥭",
        discount: 5,
        rating: 4.6,
        stock: 70,
        description: "Mango fruit drink."
    },

    {
        id: 28,
        name: "Real Fruit Juice",
        category: "Cold Drinks & Juices",
        price: 110,
        unit: "1 L",
        icon: "🧃",
        discount: 10,
        rating: 4.5,
        stock: 45,
        description: "Fruit juice for the family."
    },


    /* =====================================================
       INSTANT FOOD
       ===================================================== */

    {
        id: 29,
        name: "Maggi 2-Minute Noodles",
        category: "Instant & Frozen Food",
        price: 15,
        unit: "70 g",
        icon: "🍜",
        discount: 0,
        rating: 4.8,
        stock: 150,
        description: "Quick and tasty instant noodles."
    },

    {
        id: 30,
        name: "Yippee Noodles",
        category: "Instant & Frozen Food",
        price: 15,
        unit: "70 g",
        icon: "🍜",
        discount: 0,
        rating: 4.6,
        stock: 150,
        description: "Tasty instant noodles."
    },

    {
        id: 31,
        name: "Frozen Green Peas",
        category: "Instant & Frozen Food",
        price: 95,
        unit: "500 g",
        icon: "🫛",
        discount: 10,
        rating: 4.5,
        stock: 40,
        description: "Frozen green peas."
    },

    {
        id: 32,
        name: "French Fries",
        category: "Instant & Frozen Food",
        price: 125,
        unit: "400 g",
        icon: "🍟",
        discount: 15,
        rating: 4.6,
        stock: 35,
        description: "Crispy frozen French fries."
    },


    /* =====================================================
       TEA COFFEE
       ===================================================== */

    {
        id: 33,
        name: "Tata Tea Gold",
        category: "Tea, Coffee & Health Drink",
        price: 145,
        unit: "250 g",
        icon: "🍵",
        discount: 10,
        rating: 4.7,
        stock: 50,
        description: "Aromatic Indian tea."
    },

    {
        id: 34,
        name: "Bru Instant Coffee",
        category: "Tea, Coffee & Health Drink",
        price: 175,
        unit: "100 g",
        icon: "☕",
        discount: 8,
        rating: 4.6,
        stock: 40,
        description: "Instant coffee for your mornings."
    },

    {
        id: 35,
        name: "Nescafe Classic",
        category: "Tea, Coffee & Health Drink",
        price: 299,
        unit: "100 g",
        icon: "☕",
        discount: 12,
        rating: 4.8,
        stock: 40,
        description: "Classic instant coffee."
    },

    {
        id: 36,
        name: "Bournvita",
        category: "Tea, Coffee & Health Drink",
        price: 245,
        unit: "500 g",
        icon: "🥛",
        discount: 10,
        rating: 4.7,
        stock: 35,
        description: "Chocolate health drink."
    },


    /* =====================================================
       BISCUITS
       ===================================================== */

    {
        id: 37,
        name: "Parle-G",
        category: "Bakery & Biscuits",
        price: 70,
        unit: "800 g",
        icon: "🍪",
        discount: 5,
        rating: 4.7,
        stock: 100,
        description: "Classic Indian glucose biscuits."
    },

    {
        id: 38,
        name: "Good Day",
        category: "Bakery & Biscuits",
        price: 120,
        unit: "600 g",
        icon: "🍪",
        discount: 10,
        rating: 4.6,
        stock: 70,
        description: "Crunchy butter biscuits."
    },

    {
        id: 39,
        name: "Oreo",
        category: "Bakery & Biscuits",
        price: 120,
        unit: "300 g",
        icon: "🍪",
        discount: 12,
        rating: 4.8,
        stock: 80,
        description: "Chocolate sandwich biscuits."
    },

    {
        id: 40,
        name: "Hide & Seek",
        category: "Bakery & Biscuits",
        price: 80,
        unit: "200 g",
        icon: "🍪",
        discount: 5,
        rating: 4.6,
        stock: 70,
        description: "Chocolate chip biscuits."
    },


    /* =====================================================
       SWEETS
       ===================================================== */

    {
        id: 41,
        name: "Dairy Milk",
        category: "Sweet Tooth",
        price: 120,
        unit: "110 g",
        icon: "🍫",
        discount: 5,
        rating: 4.9,
        stock: 100,
        description: "Smooth milk chocolate."
    },

    {
        id: 42,
        name: "KitKat",
        category: "Sweet Tooth",
        price: 50,
        unit: "70 g",
        icon: "🍫",
        discount: 0,
        rating: 4.8,
        stock: 100,
        description: "Crispy chocolate wafer."
    },

    {
        id: 43,
        name: "5 Star",
        category: "Sweet Tooth",
        price: 25,
        unit: "45 g",
        icon: "🍫",
        discount: 0,
        rating: 4.7,
        stock: 100,
        description: "Chewy caramel chocolate."
    },

    {
        id: 44,
        name: "Gulab Jamun",
        category: "Sweet Tooth",
        price: 180,
        unit: "1 box",
        icon: "🍮",
        discount: 10,
        rating: 4.7,
        stock: 25,
        description: "Soft Indian sweet."
    },


    /* =====================================================
       STAPLES
       ===================================================== */

    {
        id: 45,
        name: "India Gate Basmati Rice",
        category: "Staples",
        price: 499,
        unit: "5 kg",
        icon: "🍚",
        discount: 15,
        rating: 4.8,
        stock: 35,
        description: "Premium long-grain basmati rice."
    },

    {
        id: 46,
        name: "Toor Dal",
        category: "Staples",
        price: 175,
        unit: "1 kg",
        icon: "🌾",
        discount: 10,
        rating: 4.7,
        stock: 60,
        description: "Quality yellow pigeon peas."
    },

    {
        id: 47,
        name: "Moong Dal",
        category: "Staples",
        price: 145,
        unit: "1 kg",
        icon: "🌾",
        discount: 8,
        rating: 4.6,
        stock: 60,
        description: "Nutritious moong dal."
    },

    {
        id: 48,
        name: "Atta",
        category: "Staples",
        price: 260,
        unit: "5 kg",
        icon: "🌾",
        discount: 10,
        rating: 4.7,
        stock: 50,
        description: "Whole wheat flour."
    },

    {
        id: 49,
        name: "Sugar",
        category: "Staples",
        price: 50,
        unit: "1 kg",
        icon: "🍚",
        discount: 0,
        rating: 4.5,
        stock: 100,
        description: "Fine quality sugar."
    },

    {
        id: 50,
        name: "Salt",
        category: "Staples",
        price: 25,
        unit: "1 kg",
        icon: "🧂",
        discount: 0,
        rating: 4.5,
        stock: 100,
        description: "Everyday cooking salt."
    },


    /* =====================================================
       CLEANING
       ===================================================== */

    {
        id: 51,
        name: "Surf Excel Matic",
        category: "Cleaning Essentials",
        price: 399,
        unit: "2 kg",
        icon: "🧺",
        discount: 15,
        rating: 4.7,
        stock: 30,
        description: "Powerful laundry detergent."
    },

    {
        id: 52,
        name: "Vim Dishwash Gel",
        category: "Cleaning Essentials",
        price: 125,
        unit: "750 ml",
        icon: "🧽",
        discount: 10,
        rating: 4.7,
        stock: 50,
        description: "Dishwashing gel."
    },

    {
        id: 53,
        name: "Harpic Toilet Cleaner",
        category: "Cleaning Essentials",
        price: 105,
        unit: "500 ml",
        icon: "🧴",
        discount: 10,
        rating: 4.6,
        stock: 50,
        description: "Toilet cleaning liquid."
    },

    {
        id: 54,
        name: "Lizol Floor Cleaner",
        category: "Cleaning Essentials",
        price: 210,
        unit: "1 L",
        icon: "🧹",
        discount: 12,
        rating: 4.7,
        stock: 40,
        description: "Floor cleaning liquid."
    },


    /* =====================================================
       PERSONAL CARE
       ===================================================== */

    {
        id: 55,
        name: "Dove Soap",
        category: "Personal Care",
        price: 135,
        unit: "3 pcs",
        icon: "🧼",
        discount: 10,
        rating: 4.7,
        stock: 60,
        description: "Moisturizing bathing soap."
    },

    {
        id: 56,
        name: "Colgate Toothpaste",
        category: "Personal Care",
        price: 125,
        unit: "200 g",
        icon: "🪥",
        discount: 10,
        rating: 4.7,
        stock: 80,
        description: "Everyday oral care toothpaste."
    },

    {
        id: 57,
        name: "Face Wash",
        category: "Personal Care",
        price: 180,
        unit: "100 ml",
        icon: "🧴",
        discount: 15,
        rating: 4.5,
        stock: 40,
        description: "Gentle daily face wash."
    },

    {
        id: 58,
        name: "Handwash",
        category: "Personal Care",
        price: 99,
        unit: "250 ml",
        icon: "🧴",
        discount: 8,
        rating: 4.6,
        stock: 60,
        description: "Liquid hand wash."
    },


    /* =====================================================
       BABY CARE
       ===================================================== */

    {
        id: 59,
        name: "Baby Diapers",
        category: "Baby Care",
        price: 499,
        unit: "M 24 pcs",
        icon: "👶",
        discount: 15,
        rating: 4.7,
        stock: 30,
        description: "Soft baby diapers."
    },

    {
        id: 60,
        name: "Baby Wipes",
        category: "Baby Care",
        price: 179,
        unit: "72 pcs",
        icon: "👶",
        discount: 10,
        rating: 4.7,
        stock: 40,
        description: "Gentle baby wipes."
    },


    /* =====================================================
       PET CARE
       ===================================================== */

    {
        id: 61,
        name: "Dog Food",
        category: "Pet Care",
        price: 260,
        unit: "1 kg",
        icon: "🐶",
        discount: 10,
        rating: 4.6,
        stock: 30,
        description: "Complete dog food."
    },

    {
        id: 62,
        name: "Cat Food",
        category: "Pet Care",
        price: 290,
        unit: "1 kg",
        icon: "🐱",
        discount: 10,
        rating: 4.7,
        stock: 30,
        description: "Nutritious cat food."
    },


    /* =====================================================
       EXTRA PRODUCT
       ===================================================== */

    {
        id: 63,
        name: "Parle-G Gold",
        category: "Bakery & Biscuits",
        price: 20,
        unit: "1 pack",
        image: "images/parle-g.jpg",
        images: [
            "images/parle-g.jpg"
        ],
        icon: "🍪",
        discount: 0,
        rating: 4.7,
        stock: 100,
        description: "Crispy and delicious Parle-G Gold biscuits."
    }

];


/* =========================================================
   DOM HELPERS
   ========================================================= */

function getElement(id) {
    return document.getElementById(id);
}


function select(selector) {
    return document.querySelector(selector);
}


function selectAll(selector) {
    return Array.from(
        document.querySelectorAll(selector)
    );
}


/* =========================================================
   IMAGE HELPERS
   ========================================================= */

function getProductImages(product) {

    if (
        Array.isArray(product.images) &&
        product.images.length
    ) {
        return product.images;
    }

    if (product.image) {
        return [product.image];
    }

    return [];
}


function getImageForIndex(product, index) {

    const images = getProductImages(product);

    if (!images.length) {
        return null;
    }

    if (images[index]) {
        return images[index];
    }

    return images[images.length - 1];
}


/* =========================================================
   CART STORAGE
   ========================================================= */

function getCartStorageKey() {

    const savedUser =
        localStorage.getItem("furzo_user");

    if (!savedUser) {
        return "furzo_cart_guest";
    }

    try {

        const user =
            JSON.parse(savedUser);

        if (user && user.phone) {
            return "furzo_cart_" + user.phone;
        }

    } catch (error) {

        console.error(
            "User data error:",
            error
        );

    }

    return "furzo_cart_guest";
}


function loadCart() {

    try {

        const savedCart =
            localStorage.getItem(
                getCartStorageKey()
            );

        if (!savedCart) {
            return [];
        }

        const parsed =
            JSON.parse(savedCart);

        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch (error) {

        console.error(
            "Cart loading error:",
            error
        );

        return [];

    }

}


function saveCart() {

    try {

        localStorage.setItem(
            getCartStorageKey(),
            JSON.stringify(cart)
        );

    } catch (error) {

        console.error(
            "Cart saving error:",
            error
        );

    }

}


/* =========================================================
   PRODUCT HELPERS
   ========================================================= */

function getProductById(id) {

    return products.find(
        product =>
            Number(product.id) === Number(id)
    );

}


function getCategories() {

    const categories = ["All"];

    products.forEach(product => {

        if (
            !categories.includes(
                product.category
            )
        ) {

            categories.push(
                product.category
            );

        }

    });

    return categories;

}


/* =========================================================
   MONEY
   ========================================================= */

function formatPrice(price) {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(price);

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   QUANTITY
   ========================================================= */

function getQuantity(id) {

    const item =
        cart.find(
            cartItem =>
                Number(cartItem.id) ===
                Number(id)
        );

    return item
        ? Number(item.quantity)
        : 0;

}


/* =========================================================
   ADD TO CART
   ========================================================= */

function addToCart(id) {

    const product =
        getProductById(id);

    if (!product) {

        showToast(
            "Product not found"
        );

        return;

    }

    const existing =
        cart.find(
            item =>
                Number(item.id) ===
                Number(id)
        );

    if (existing) {

        if (
            Number(existing.quantity) >=
            Number(product.stock)
        ) {

            showToast(
                "Maximum stock reached"
            );

            return;

        }

        existing.quantity += 1;

    } else {

        cart.push({
            id: product.id,
            quantity: 1
        });

    }

    saveCart();

    renderProducts();
    renderCart();
    updateCartCount();

    showToast(
        `${product.name} added to cart`
    );

}


/* =========================================================
   DECREASE
   ========================================================= */

function decreaseQuantity(id) {

    const item =
        cart.find(
            cartItem =>
                Number(cartItem.id) ===
                Number(id)
        );

    if (!item) {
        return;
    }

    item.quantity -= 1;

    if (item.quantity <= 0) {

        cart =
            cart.filter(
                cartItem =>
                    Number(cartItem.id) !==
                    Number(id)
            );

    }

    saveCart();

    renderProducts();
    renderCart();
    updateCartCount();

    if (selectedProduct) {

        const product =
            getProductById(
                selectedProduct.id
            );

        if (product) {
            openProduct(product.id);
        }

    }

}


/* =========================================================
   INCREASE
   ========================================================= */

function increaseQuantity(id) {

    const product =
        getProductById(id);

    const item =
        cart.find(
            cartItem =>
                Number(cartItem.id) ===
                Number(id)
        );

    if (!product || !item) {
        return;
    }

    if (
        item.quantity >=
        product.stock
    ) {

        showToast(
            "Maximum stock reached"
        );

        return;

    }

    item.quantity += 1;

    saveCart();

    renderProducts();
    renderCart();
    updateCartCount();

    if (selectedProduct) {

        const productStill =
            getProductById(
                selectedProduct.id
            );

        if (productStill) {
            openProduct(productStill.id);
        }

    }

}


/* =========================================================
   CART COUNT
   ========================================================= */

function updateCartCount() {

    const countElement =
        getElement("cartCount");

    if (!countElement) {
        return;
    }

    const count =
        cart.reduce(
            (
                total,
                item
            ) =>
                total +
                Number(item.quantity),
            0
        );

    countElement.textContent =
        count;

}


/* =========================================================
   PRODUCT CARD
   ========================================================= */

function createProductCard(product) {

    const quantity =
        getQuantity(product.id);

    let actionHtml;

    if (quantity > 0) {

        actionHtml = `

            <div class="quantity-control">

                <button
                    type="button"
                    data-minus="${product.id}"
                >
                    −
                </button>

                <strong>
                    ${quantity}
                </strong>

                <button
                    type="button"
                    data-plus="${product.id}"
                >
                    +
                </button>

            </div>

        `;

    } else {

        actionHtml = `

            <button
                type="button"
                class="add-button"
                data-add="${product.id}"
            >
                ADD
            </button>

        `;

    }

    const cardImage =
        product.image
            ? `
                <img
                    src="${product.image}"
                    alt="${escapeHtml(product.name)}"
                >
              `
            : product.icon;

    return `

        <article class="product-card">

            <div
                class="product-image"
                data-product="${product.id}"
                title="View ${escapeHtml(product.name)}"
            >
                ${cardImage}
            </div>

            <span class="discount-badge">
                ${product.discount}% OFF
            </span>

            <h3 class="product-name">
                ${escapeHtml(product.name)}
            </h3>

            <div class="product-unit">
                ${escapeHtml(product.unit)}
                · ⭐ ${product.rating}
            </div>

            <div class="product-bottom">

                <span class="product-price">
                    ${formatPrice(product.price)}
                </span>

                ${actionHtml}

            </div>

        </article>

    `;

}


/* =========================================================
   FILTER
   ========================================================= */

function getFilteredProducts() {

    const search =
        currentSearch
            .trim()
            .toLowerCase();

    return products.filter(
        product => {

            const categoryMatch =
                currentCategory === "All" ||
                product.category ===
                currentCategory;

            const searchMatch =
                search === "" ||
                product.name
                    .toLowerCase()
                    .includes(search) ||
                product.category
                    .toLowerCase()
                    .includes(search);

            return (
                categoryMatch &&
                searchMatch
            );

        }
    );

}


/* =========================================================
   RENDER PRODUCTS
   ========================================================= */

function renderProducts() {

    const grid =
        getElement("productGrid");

    if (!grid) {
        return;
    }

    const filtered =
        getFilteredProducts();

    if (!filtered.length) {

        grid.innerHTML = `

            <div class="empty-result">

                <h2>
                    No products found
                </h2>

                <p>
                    Try another product
                    or category.
                </p>

            </div>

        `;

        return;

    }

    grid.innerHTML =
        filtered
            .map(createProductCard)
            .join("");

}


/* =========================================================
   CATEGORY ICONS
   ========================================================= */

function getCategoryIcon(category) {

    const icons = {

        "All": "🛍️",
        "Fruits": "🍎",
        "Vegetables": "🥕",
        "Fruits & Vegetables": "🍎",
        "Dairy & Breakfast": "🥛",
        "Munchies": "🍿",
        "Cold Drinks & Juices": "🥤",
        "Instant & Frozen Food": "🍜",
        "Tea, Coffee & Health Drink": "☕",
        "Bakery & Biscuits": "🍪",
        "Sweet Tooth": "🍫",
        "Staples": "🌾",
        "Cleaning Essentials": "🧹",
        "Personal Care": "🧴",
        "Baby Care": "👶",
        "Pet Care": "🐶"

    };

    return icons[category] || "🛒";

}


/* =========================================================
   CATEGORY RENDER
   ========================================================= */

function renderCategories() {

    const categoryBar =
        getElement("categoryBar");

    if (!categoryBar) {
        return;
    }

    const categories =
        getCategories();

    categoryBar.innerHTML =
        categories
            .map(
                category => {

                    const active =
                        category ===
                        currentCategory
                            ? "active"
                            : "";

                    return `

                        <button
                            type="button"
                            class="category-button ${active}"
                            data-category="${escapeHtml(category)}"
                        >
                            ${getCategoryIcon(category)}
                            ${escapeHtml(category)}
                        </button>

                    `;

                }
            )
            .join("");

}


/* =========================================================
   SUBTOTAL
   ========================================================= */

function getSubtotal() {

    return cart.reduce(
        (
            total,
            item
        ) => {

            const product =
                getProductById(item.id);

            if (!product) {
                return total;
            }

            return (
                total +
                product.price *
                Number(item.quantity)
            );

        },
        0
    );

}


/* =========================================================
   DELIVERY
   ========================================================= */

function getDeliveryFee() {

    const subtotal =
        getSubtotal();

    if (subtotal === 0) {
        return 0;
    }

    if (subtotal >= 499) {
        return 0;
    }

    return 30;

}


/* =========================================================
   GRAND TOTAL
   ========================================================= */

function getGrandTotal() {

    return (
        getSubtotal() +
        getDeliveryFee()
    );

}


/* =========================================================
   CART ITEM
   ========================================================= */

function createCartItem(item) {

    const product =
        getProductById(item.id);

    if (!product) {
        return "";
    }

    const total =
        product.price *
        Number(item.quantity);

    const images =
        getProductImages(product);

    const imageHtml =
        images.length
            ? `
                <img
                    src="${images[0]}"
                    alt="${escapeHtml(product.name)}"
                    style="
                        width:55px;
                        height:55px;
                        object-fit:contain;
                        border-radius:10px;
                    "
                >
              `
            : product.icon;

    return `

        <div class="cart-item">

            <div class="cart-item-icon">
                ${imageHtml}
            </div>

            <div>

                <div class="cart-item-name">
                    ${escapeHtml(product.name)}
                </div>

                <small>
                    ${escapeHtml(product.unit)}
                    ·
                    ${formatPrice(product.price)}
                </small>

                <div class="cart-quantity">

                    <button
                        type="button"
                        data-cart-minus="${product.id}"
                    >
                        −
                    </button>

                    <strong>
                        ${item.quantity}
                    </strong>

                    <button
                        type="button"
                        data-cart-plus="${product.id}"
                    >
                        +
                    </button>

                </div>

            </div>

            <div class="cart-item-price">
                ${formatPrice(total)}
            </div>

        </div>

    `;

}


/* =========================================================
   RENDER CART
   ========================================================= */

function renderCart() {

    const itemsElement =
        getElement("cartItems");

    const summaryElement =
        getElement("cartSummary");

    if (!itemsElement) {
        return;
    }

    if (!cart.length) {

        itemsElement.innerHTML = `

            <div
                style="
                    text-align:center;
                    padding:50px 15px;
                    color:#777;
                "
            >

                <div
                    style="
                        font-size:60px;
                        margin-bottom:15px;
                    "
                >
                    🛒
                </div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add some products to
                    continue shopping.
                </p>

            </div>

        `;

        if (summaryElement) {
            summaryElement.innerHTML = "";
        }

        return;

    }

    itemsElement.innerHTML =
        cart
            .map(createCartItem)
            .join("");

    const subtotal =
        getSubtotal();

    const delivery =
        getDeliveryFee();

    const total =
        getGrandTotal();

    if (summaryElement) {

        summaryElement.innerHTML = `

            <div class="summary-row">

                <span>
                    Subtotal
                </span>

                <strong>
                    ${formatPrice(subtotal)}
                </strong>

            </div>

            <div class="summary-row">

                <span>
                    Delivery
                </span>

                <strong>
                    ${
                        delivery === 0
                            ? "FREE"
                            : formatPrice(delivery)
                    }
                </strong>

            </div>

            <div
                class="summary-row summary-total"
            >

                <span>
                    Total
                </span>

                <strong>
                    ${formatPrice(total)}
                </strong>

            </div>

            <button
                type="button"
                class="checkout-button"
                id="checkoutButton"
            >
                Proceed to checkout
            </button>

        `;

    }

}


/* =========================================================
   CART OPEN
   ========================================================= */

function openCart() {

    renderCart();

    const overlay =
        getElement("cartOverlay");

    if (overlay) {

        overlay.classList.add("open");

    }

}


/* =========================================================
   CART CLOSE
   ========================================================= */

function closeCart() {

    const overlay =
        getElement("cartOverlay");

    if (overlay) {

        overlay.classList.remove("open");

    }

}


/* =========================================================
   PRODUCT POPUP
   ========================================================= */

function openProduct(id) {

    const product =
        getProductById(id);

    if (!product) {
        return;
    }

    selectedProduct =
        product;

    const detail =
        getElement("productDetail");

    if (!detail) {
        return;
    }

    const quantity =
        getQuantity(product.id);

    const images =
        getProductImages(product);

    const firstImage =
        images[0] || null;


    /* =====================================================
       MAIN IMAGE
       ===================================================== */

    const mainImage =
        firstImage

            ? `
                <img
                    src="${firstImage}"
                    alt="${escapeHtml(product.name)}"
                    class="furzo-main-product-img"
                >
              `

            : `
                <div
                    class="furzo-icon-fallback"
                >
                    ${product.icon}
                </div>
              `;


    /* =====================================================
       BUTTON
       ===================================================== */

    const buttonHtml =
        quantity > 0

            ? `

                <div
                    class="quantity-control"
                    style="
                        width:100%;
                        height:52px;
                        border-radius:8px;
                    "
                >

                    <button
                        type="button"
                        data-detail-minus="${product.id}"
                    >
                        −
                    </button>

                    <strong>
                        ${quantity}
                    </strong>

                    <button
                        type="button"
                        data-detail-plus="${product.id}"
                    >
                        +
                    </button>

                </div>

              `

            : `

                <button
                    type="button"
                    class="checkout-button"
                    data-detail-add="${product.id}"
                    style="
                        margin-top:20px;
                        width:100%;
                        height:52px;
                        font-size:16px;
                        border-radius:8px;
                    "
                >
                    Add to basket
                </button>

              `;


    /* =====================================================
       THUMBNAILS
       ===================================================== */

    let thumbnailsHtml = "";

    for (
        let index = 0;
        index < 4;
        index++
    ) {

        const thumbnailImage =
            getImageForIndex(
                product,
                index
            );

        if (thumbnailImage) {

            thumbnailsHtml += `

                <button
                    type="button"
                    class="furzo-thumbnail ${
                        index === 0
                            ? "active"
                            : ""
                    }"
                    data-thumbnail-index="${index}"
                >

                    <img
                        src="${thumbnailImage}"
                        alt="${escapeHtml(product.name)} ${index + 1}"
                    >

                </button>

            `;

        } else {

            thumbnailsHtml += `

                <button
                    type="button"
                    class="furzo-thumbnail ${
                        index === 0
                            ? "active"
                            : ""
                    }"
                    data-thumbnail-index="${index}"
                >
                    ${product.icon}
                </button>

            `;

        }

    }


    /* =====================================================
       POPUP HTML
       ===================================================== */

    detail.innerHTML = `

        <div class="furzo-product-detail">


            <!-- LEFT -->

            <div class="furzo-gallery">

                <div class="furzo-thumbnails">

                    ${thumbnailsHtml}

                </div>


                <div class="furzo-main-image-wrap">

                    <div
                        class="furzo-main-image"
                        id="mainProductImage"
                    >

                        ${mainImage}

                    </div>


                    ${
                        firstImage
                            ? `

                                <div
                                    class="furzo-zoom-box"
                                    id="furzoZoomBox"
                                    aria-hidden="true"
                                >

                                    <img
                                        src="${firstImage}"
                                        alt="${escapeHtml(product.name)} zoom"
                                    >

                                </div>

                              `
                            : ""
                    }

                </div>

            </div>


            <!-- RIGHT -->

            <div class="furzo-product-info">


                <div class="furzo-brand">
                    Furzo Fresh
                </div>


                <h1>
                    ${escapeHtml(product.name)}
                </h1>


                <div class="furzo-delivery-badge">
                    ⚡ Delivery in 10 mins
                </div>


                <div class="furzo-rating">

                    ⭐ ${product.rating}

                    <span>
                        • ${product.stock} in stock
                    </span>

                </div>


                <div class="furzo-price-box">


                    <div class="furzo-mrp">

                        MRP:

                        <span>
                            ${formatPrice(
                                Math.round(
                                    product.price * 1.20
                                )
                            )}
                        </span>

                    </div>


                    <div class="furzo-price">
                        ${formatPrice(product.price)}
                    </div>


                    <div class="furzo-saving">

                        You Save:

                        <strong>
                            ${product.discount}%
                        </strong>

                    </div>


                    <div class="furzo-tax">
                        Inclusive of all taxes
                    </div>


                </div>


                <div class="furzo-pack">

                    <strong>
                        Pack:
                    </strong>

                    ${escapeHtml(product.unit)}

                </div>


                <p class="furzo-description">

                    ${escapeHtml(
                        product.description
                    )}

                </p>


                <div class="furzo-action-row">


                    <div style="flex:1;">

                        ${buttonHtml}

                    </div>


                    <button
                        type="button"
                        class="furzo-wishlist"
                        id="furzoWishlistButton"
                    >

                        ♡
                        <span>
                            Wishlist
                        </span>

                    </button>


                </div>


                <div class="furzo-extra-info">

                    <div>
                        🚚 Fast delivery
                    </div>

                    <div>
                        🛡️ Quality assured
                    </div>

                    <div>
                        🔄 Easy support
                    </div>

                </div>


            </div>


        </div>

    `;


    /* =====================================================
       POPUP OPEN
       ===================================================== */

    const overlay =
        getElement("productOverlay");

    if (overlay) {

        overlay.classList.add("open");

        overlay.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    /* =====================================================
       THUMBNAIL CLICK
       ===================================================== */

    const thumbnails =
        detail.querySelectorAll(
            ".furzo-thumbnail"
        );

    const mainImageElement =
        getElement(
            "mainProductImage"
        );

    thumbnails.forEach(
        thumbnail => {

            thumbnail.addEventListener(
                "click",
                function() {

                    thumbnails.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    thumbnail.classList.add(
                        "active"
                    );


                    const index =
                        Number(
                            thumbnail.dataset
                                .thumbnailIndex
                        );


                    const selectedImage =
                        getImageForIndex(
                            product,
                            index
                        );


                    if (
                        mainImageElement &&
                        selectedImage
                    ) {

                        mainImageElement.innerHTML = `

                            <img
                                src="${selectedImage}"
                                alt="${escapeHtml(product.name)}"
                                class="furzo-main-product-img"
                            >

                        `;

                    }


                    refreshFurzoZoom();

                }

            );

        }
    );


    /* =====================================================
       WISHLIST
       ===================================================== */

    const wishlistButton =
        getElement(
            "furzoWishlistButton"
        );

    if (wishlistButton) {

        wishlistButton.addEventListener(
            "click",
            function() {

                showToast(
                    "Added to wishlist"
                );

            }
        );

    }


    /* =====================================================
       START ZOOM
       ===================================================== */

    setupFurzoZoom();

}


/* =========================================================
   ZOOM
   ========================================================= */

function setupFurzoZoom() {

    const wrap =
        document.querySelector(
            ".furzo-main-image-wrap"
        );

    if (!wrap) {
        return;
    }

    const image =
        wrap.querySelector(
            ".furzo-main-product-img"
        );

    const zoomBox =
        wrap.querySelector(
            ".furzo-zoom-box"
        );

    if (
        !image ||
        !zoomBox
    ) {

        return;

    }

    const zoomImg =
        zoomBox.querySelector(
            "img"
        );

    if (!zoomImg) {
        return;
    }


    zoomImg.style.display =
        "none";

    zoomBox.style.backgroundImage =
        `url("${image.src}")`;

    zoomBox.style.backgroundRepeat =
        "no-repeat";

    zoomBox.style.backgroundSize =
        "200% 200%";

    zoomBox.style.backgroundPosition =
        "50% 50%";

    zoomBox.style.display =
        "none";


    wrap.onmousemove =
        function(event) {

            const rect =
                image.getBoundingClientRect();

            if (
                rect.width <= 0 ||
                rect.height <= 0
            ) {

                return;

            }


            let x =
                event.clientX -
                rect.left;

            let y =
                event.clientY -
                rect.top;


            x =
                Math.max(
                    0,
                    Math.min(
                        rect.width,
                        x
                    )
                );


            y =
                Math.max(
                    0,
                    Math.min(
                        rect.height,
                        y
                    )
                );


            const percentX =
                (x / rect.width) * 100;

            const percentY =
                (y / rect.height) * 100;


            zoomBox.style.backgroundImage =
                `url("${image.src}")`;

            zoomBox.style.backgroundPosition =
                `${percentX}% ${percentY}%`;

            zoomBox.style.display =
                "block";

        };


    wrap.onmouseleave =
        function() {

            zoomBox.style.display =
                "none";

        };

}


/* =========================================================
   REFRESH ZOOM
   ========================================================= */

function refreshFurzoZoom() {

    const wrap =
        document.querySelector(
            ".furzo-main-image-wrap"
        );

    if (!wrap) {
        return;
    }

    const image =
        wrap.querySelector(
            ".furzo-main-product-img"
        );

    const zoomBox =
        wrap.querySelector(
            ".furzo-zoom-box"
        );

    if (
        !image ||
        !zoomBox
    ) {

        return;

    }

    zoomBox.style.backgroundImage =
        `url("${image.src}")`;

    zoomBox.style.backgroundSize =
        "200% 200%";

    zoomBox.style.backgroundPosition =
        "50% 50%";

    setupFurzoZoom();

}


/* =========================================================
   CLOSE PRODUCT
   ========================================================= */

function closeProduct() {

    const overlay =
        getElement(
            "productOverlay"
        );

    if (overlay) {

        overlay.classList.remove(
            "open"
        );

        overlay.setAttribute(
            "aria-hidden",
            "true"
        );

    }

    selectedProduct =
        null;

}


/* =========================================================
   CHECKOUT
   ========================================================= */

function openCheckout() {

    if (!cart.length) {

        showToast(
            "Your cart is empty"
        );

        return;

    }

    const overlay =
        getElement(
            "checkoutOverlay"
        );

    if (overlay) {

        overlay.classList.add(
            "open"
        );

    }

}


function closeCheckout() {

    const overlay =
        getElement(
            "checkoutOverlay"
        );

    if (overlay) {

        overlay.classList.remove(
            "open"
        );

    }

}


/* =========================================================
   SAVE ORDER
   ========================================================= */

function saveOrder(order) {

    try {

        const orders =
            JSON.parse(
                localStorage.getItem(
                    ORDER_STORAGE_KEY
                ) || "[]"
            );

        orders.push(order);

        localStorage.setItem(
            ORDER_STORAGE_KEY,
            JSON.stringify(orders)
        );

    } catch (error) {

        console.error(
            "Order save error:",
            error
        );

    }

}


/* =========================================================
   PLACE ORDER
   ========================================================= */

function placeOrder(event) {

    event.preventDefault();

    if (!cart.length) {

        showToast(
            "Your cart is empty"
        );

        return;

    }

    const form =
        event.currentTarget;

    const formData =
        new FormData(form);

    const customer = {

        name:
            formData.get("name"),

        phone:
            formData.get("phone"),

        address:
            formData.get("address"),

        payment:
            formData.get("payment")

    };

    const order = {

        id:
            "FZ" +
            Date.now()
                .toString()
                .slice(-8),

        customer:
            customer,

        items:
            cart.map(
                item => ({

                    id:
                        item.id,

                    quantity:
                        item.quantity

                })
            ),

        subtotal:
            getSubtotal(),

        delivery:
            getDeliveryFee(),

        total:
            getGrandTotal(),

        createdAt:
            new Date()
                .toISOString()

    };

    saveOrder(order);

    cart = [];

    saveCart();

    renderProducts();
    renderCart();
    updateCartCount();

    closeCheckout();
    closeCart();
    closeProduct();

    form.reset();

    showToast(
        `Order ${order.id} placed successfully`
    );

}


/* =========================================================
   ADDRESS
   ========================================================= */

function changeAddress() {

    const oldAddress =
        localStorage.getItem(
            ADDRESS_STORAGE_KEY
        ) || "";

    const address =
        window.prompt(
            "Enter your delivery address:",
            oldAddress
        );

    if (address === null) {
        return;
    }

    const cleaned =
        address.trim();

    if (!cleaned) {

        showToast(
            "Please enter an address"
        );

        return;

    }

    localStorage.setItem(
        ADDRESS_STORAGE_KEY,
        cleaned
    );

    updateAddress();

    showToast(
        "Delivery address saved"
    );

}


function updateAddress() {

    const addressElement =
        getElement(
            "addressText"
        );

    if (!addressElement) {
        return;
    }

    const address =
        localStorage.getItem(
            ADDRESS_STORAGE_KEY
        );

    if (!address) {

        addressElement.textContent =
            "Select address";

        return;

    }

    addressElement.textContent =
        address.length > 30
            ? address.substring(0, 30) + "..."
            : address;

}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

    const toast =
        getElement("toast");

    if (!toast) {
        return;
    }

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    clearTimeout(
        toastTimer
    );

    toastTimer =
        setTimeout(
            function() {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );

}


/* =========================================================
   SEARCH
   ========================================================= */

function performSearch() {

    const input =
        getElement(
            "searchInput"
        );

    if (!input) {
        return;
    }

    currentSearch =
        input.value;

    renderProducts();

}


/* =========================================================
   PROFILE
   ========================================================= */

function openProfile() {

    const userData =
        localStorage.getItem(
            "furzo_user"
        );

    if (!userData) {

        showToast(
            "Please login first"
        );

        return;

    }

    let user;

    try {

        user =
            JSON.parse(
                userData
            );

    } catch (error) {

        showToast(
            "Profile data error"
        );

        return;

    }

    const oldProfile =
        getElement(
            "profileOverlay"
        );

    if (oldProfile) {
        oldProfile.remove();
    }

    const overlay =
        document.createElement(
            "div"
        );

    overlay.id =
        "profileOverlay";

    overlay.className =
        "overlay open";

    overlay.innerHTML = `

        <div
            style="
                background:#fff;
                width:min(420px,92vw);
                border-radius:22px;
                padding:28px;
                position:relative;
                box-shadow:0 20px 60px rgba(0,0,0,.18);
            "
        >

            <button
                type="button"
                id="closeProfileButton"
                style="
                    position:absolute;
                    right:16px;
                    top:16px;
                    border:0;
                    background:#f3f3f3;
                    width:38px;
                    height:38px;
                    border-radius:50%;
                    font-size:20px;
                    cursor:pointer;
                "
            >
                ×
            </button>

            <h2>
                My Profile
            </h2>

            <p style="color:#777;">
                Your Furzo account details
            </p>

            <div
                style="
                    background:#f7f7f7;
                    border-radius:16px;
                    padding:18px;
                    margin-top:15px;
                "
            >

                <div
                    style="
                        font-size:12px;
                        color:#777;
                    "
                >
                    Name
                </div>

                <div
                    style="
                        font-size:17px;
                        font-weight:700;
                    "
                >
                    ${escapeHtml(
                        user.name || ""
                    )}
                </div>

            </div>


            <div
                style="
                    background:#f7f7f7;
                    border-radius:16px;
                    padding:18px;
                    margin-top:12px;
                "
            >

                <div
                    style="
                        font-size:12px;
                        color:#777;
                    "
                >
                    Mobile Number
                </div>

                <div
                    style="
                        font-size:17px;
                        font-weight:700;
                    "
                >
                    ${escapeHtml(
                        user.phone || ""
                    )}
                </div>

            </div>

        </div>

    `;

    document.body.appendChild(
        overlay
    );

    const closeButton =
        getElement(
            "closeProfileButton"
        );

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function() {
                overlay.remove();
            }
        );

    }

    overlay.addEventListener(
        "click",
        function(event) {

            if (
                event.target === overlay
            ) {
                overlay.remove();
            }

        }
    );

}


/* =========================================================
   ORDERS
   ========================================================= */

function openOrders() {

    let orders = [];

    try {

        orders =
            JSON.parse(
                localStorage.getItem(
                    ORDER_STORAGE_KEY
                ) || "[]"
            );

        if (!Array.isArray(orders)) {
            orders = [];
        }

    } catch (error) {

        orders = [];

    }

    const oldOverlay =
        getElement(
            "ordersOverlay"
        );

    if (oldOverlay) {
        oldOverlay.remove();
    }

    const overlay =
        document.createElement(
            "div"
        );

    overlay.id =
        "ordersOverlay";

    overlay.className =
        "overlay open";

    let ordersHTML = "";

    if (!orders.length) {

        ordersHTML = `

            <div
                style="
                    text-align:center;
                    padding:50px 20px;
                "
            >

                <div
                    style="
                        font-size:60px;
                    "
                >
                    📦
                </div>

                <h2>
                    No orders yet
                </h2>

                <p style="color:#777;">
                    Your placed orders will appear here.
                </p>

            </div>

        `;

    } else {

        ordersHTML =
            orders
                .slice()
                .reverse()
                .map(
                    order => {

                        const orderDate =
                            new Date(
                                order.createdAt
                            ).toLocaleString(
                                "en-IN"
                            );

                        const itemsHTML =
                            (order.items || [])
                                .map(
                                    item => {

                                        const product =
                                            getProductById(
                                                item.id
                                            );

                                        if (!product) {
                                            return "";
                                        }

                                        return `

                                            <div
                                                style="
                                                    display:flex;
                                                    justify-content:space-between;
                                                    padding:8px 0;
                                                    border-bottom:1px solid #eee;
                                                "
                                            >

                                                <span>

                                                    ${escapeHtml(
                                                        product.name
                                                    )}

                                                    ×
                                                    ${item.quantity}

                                                </span>

                                                <strong>

                                                    ${formatPrice(
                                                        product.price *
                                                        item.quantity
                                                    )}

                                                </strong>

                                            </div>

                                        `;

                                    }
                                )
                                .join("");

                        return `

                            <div
                                style="
                                    border:1px solid #e5e5e5;
                                    border-radius:16px;
                                    padding:18px;
                                    margin-bottom:14px;
                                "
                            >

                                <div
                                    style="
                                        display:flex;
                                        justify-content:space-between;
                                    "
                                >

                                    <strong>
                                        Order ${escapeHtml(order.id)}
                                    </strong>

                                    <span
                                        style="
                                            color:#078b18;
                                            font-weight:700;
                                        "
                                    >
                                        Placed
                                    </span>

                                </div>

                                <div
                                    style="
                                        color:#777;
                                        font-size:13px;
                                        margin:8px 0 12px;
                                    "
                                >
                                    ${orderDate}
                                </div>

                                ${itemsHTML}

                                <div
                                    style="
                                        display:flex;
                                        justify-content:space-between;
                                        margin-top:14px;
                                        font-size:17px;
                                    "
                                >

                                    <strong>
                                        Total
                                    </strong>

                                    <strong>
                                        ${formatPrice(order.total)}
                                    </strong>

                                </div>

                                <div
                                    style="
                                        margin-top:10px;
                                        color:#666;
                                    "
                                >

                                    Payment:
                                    ${escapeHtml(
                                        order.customer?.payment ||
                                        "N/A"
                                    )}

                                </div>

                            </div>

                        `;

                    }
                )
                .join("");

    }

    overlay.innerHTML = `

        <div
            style="
                background:#fff;
                width:min(720px,92vw);
                max-height:85vh;
                overflow:auto;
                border-radius:22px;
                padding:24px;
                position:relative;
            "
        >

            <button
                type="button"
                id="closeOrdersButton"
                style="
                    position:absolute;
                    right:18px;
                    top:18px;
                    border:0;
                    background:#f3f3f3;
                    width:40px;
                    height:40px;
                    border-radius:50%;
                    font-size:20px;
                    cursor:pointer;
                "
            >
                ×
            </button>

            <h2>
                My Orders
            </h2>

            ${ordersHTML}

        </div>

    `;

    document.body.appendChild(
        overlay
    );

    const closeButton =
        getElement(
            "closeOrdersButton"
        );

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function() {
                overlay.remove();
            }
        );

    }

    overlay.addEventListener(
        "click",
        function(event) {

            if (
                event.target === overlay
            ) {
                overlay.remove();
            }

        }
    );

}


/* =========================================================
   LOGIN
   ========================================================= */

function openLogin() {

    const oldLogin =
        getElement(
            "loginOverlay"
        );

    if (oldLogin) {
        oldLogin.remove();
    }

    const overlay =
        document.createElement(
            "div"
        );

    overlay.id =
        "loginOverlay";

    overlay.className =
        "overlay open";

    overlay.innerHTML = `

        <div
            style="
                background:#fff;
                width:min(420px,92vw);
                border-radius:22px;
                padding:28px;
                position:relative;
                box-shadow:0 20px 60px rgba(0,0,0,.18);
            "
        >

            <button
                type="button"
                id="closeLoginButton"
                style="
                    position:absolute;
                    right:16px;
                    top:16px;
                    border:0;
                    background:#f3f3f3;
                    width:38px;
                    height:38px;
                    border-radius:50%;
                    font-size:20px;
                    cursor:pointer;
                "
            >
                ×
            </button>


            <h2>
                Welcome to Furzo
            </h2>


            <p
                id="loginSubtitle"
                style="
                    color:#777;
                "
            >
                Enter your details to continue
            </p>


            <div id="loginStepOne">

                <input
                    type="text"
                    id="loginName"
                    placeholder="Enter your name"
                    style="
                        width:100%;
                        box-sizing:border-box;
                        padding:14px;
                        border:1px solid #ddd;
                        border-radius:12px;
                        margin-bottom:12px;
                        font-size:15px;
                        outline:none;
                    "
                >


                <input
                    type="tel"
                    id="loginPhone"
                    placeholder="Enter 10-digit mobile number"
                    maxlength="10"
                    inputmode="numeric"
                    style="
                        width:100%;
                        box-sizing:border-box;
                        padding:14px;
                        border:1px solid #ddd;
                        border-radius:12px;
                        margin-bottom:16px;
                        font-size:15px;
                        outline:none;
                    "
                >


                <button
                    type="button"
                    id="sendOtpButton"
                    style="
                        width:100%;
                        border:0;
                        background:#0c831f;
                        color:white;
                        padding:14px;
                        border-radius:12px;
                        font-size:16px;
                        font-weight:700;
                        cursor:pointer;
                    "
                >
                    Send OTP
                </button>

            </div>


            <div
                id="loginStepTwo"
                style="display:none;"
            >

                <input
                    type="tel"
                    id="otpInput"
                    placeholder="Enter 6-digit OTP"
                    maxlength="6"
                    inputmode="numeric"
                    style="
                        width:100%;
                        box-sizing:border-box;
                        padding:14px;
                        border:1px solid #ddd;
                        border-radius:12px;
                        margin-bottom:12px;
                        font-size:18px;
                        letter-spacing:6px;
                        text-align:center;
                    "
                >


                <button
                    type="button"
                    id="verifyOtpButton"
                    style="
                        width:100%;
                        border:0;
                        background:#0c831f;
                        color:white;
                        padding:14px;
                        border-radius:12px;
                        font-size:16px;
                        font-weight:700;
                        cursor:pointer;
                    "
                >
                    Verify OTP
                </button>


                <button
                    type="button"
                    id="changePhoneButton"
                    style="
                        width:100%;
                        border:0;
                        background:white;
                        color:#0c831f;
                        padding:12px;
                        margin-top:8px;
                        border-radius:12px;
                        font-size:14px;
                        font-weight:700;
                        cursor:pointer;
                    "
                >
                    Change mobile number
                </button>

            </div>


            <div
                id="recaptcha-container"
                style="
                    margin-top:12px;
                "
            ></div>

        </div>

    `;

    document.body.appendChild(
        overlay
    );


    const closeButton =
        getElement(
            "closeLoginButton"
        );

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function() {

                if (
                    window.furzoRecaptchaVerifier &&
                    typeof
                        window.furzoRecaptchaVerifier
                            .clear ===
                        "function"
                ) {

                    try {

                        window
                            .furzoRecaptchaVerifier
                            .clear();

                    } catch (error) {}

                }

                overlay.remove();

            }
        );

    }


    let confirmationResult =
        null;


    const sendOtpButton =
        getElement(
            "sendOtpButton"
        );


    if (sendOtpButton) {

        sendOtpButton.addEventListener(
            "click",
            async function() {

                const name =
                    getElement(
                        "loginName"
                    )
                        ?.value
                        .trim();

                const phone =
                    getElement(
                        "loginPhone"
                    )
                        ?.value
                        .trim();

                if (!name) {

                    showToast(
                        "Please enter your name"
                    );

                    return;

                }

                if (
                    !/^[0-9]{10}$/.test(
                        phone
                    )
                ) {

                    showToast(
                        "Enter a valid 10-digit mobile number"
                    );

                    return;

                }

                if (
                    !window.furzoAuth ||
                    !window
                        .furzoRecaptchaVerifier ||
                    !window
                        .furzoSignInWithPhoneNumber
                ) {

                    showToast(
                        "Firebase is not ready"
                    );

                    return;

                }

                sendOtpButton.disabled =
                    true;

                sendOtpButton.textContent =
                    "Sending OTP...";

                try {

                    if (
                        window
                            .furzoRecaptchaVerifier &&
                        typeof
                            window
                                .furzoRecaptchaVerifier
                                .clear ===
                            "function"
                    ) {

                        try {

                            window
                                .furzoRecaptchaVerifier
                                .clear();

                        } catch (error) {}

                    }

                    const recaptchaVerifier =
                        new window
                            .furzoRecaptchaVerifier(
                                window.furzoAuth,
                                "recaptcha-container",
                                {
                                    size:
                                        "invisible"
                                }
                            );

                    confirmationResult =
                        await window
                            .furzoSignInWithPhoneNumber(
                                window.furzoAuth,
                                "+91" + phone,
                                recaptchaVerifier
                            );

                    getElement(
                        "loginStepOne"
                    ).style.display =
                        "none";

                    getElement(
                        "loginStepTwo"
                    ).style.display =
                        "block";

                    getElement(
                        "loginSubtitle"
                    ).textContent =
                        `OTP sent to +91 ${phone}`;

                    showToast(
                        "OTP sent successfully"
                    );

                } catch (error) {

                    console.error(
                        "OTP error:",
                        error
                    );

                    showToast(
                        error.message ||
                        "Unable to send OTP"
                    );

                    sendOtpButton.disabled =
                        false;

                    sendOtpButton.textContent =
                        "Send OTP";

                }

            }
        );

    }


    const verifyOtpButton =
        getElement(
            "verifyOtpButton"
        );

    if (verifyOtpButton) {

        verifyOtpButton.addEventListener(
            "click",
            async function() {

                const name =
                    getElement(
                        "loginName"
                    )
                        ?.value
                        .trim();

                const otp =
                    getElement(
                        "otpInput"
                    )
                        ?.value
                        .trim();

                if (
                    !/^[0-9]{6}$/.test(
                        otp
                    )
                ) {

                    showToast(
                        "Enter the 6-digit OTP"
                    );

                    return;

                }

                if (!confirmationResult) {

                    showToast(
                        "Please request OTP first"
                    );

                    return;

                }

                verifyOtpButton.disabled =
                    true;

                verifyOtpButton.textContent =
                    "Verifying...";

                try {

                    await confirmationResult
                        .confirm(
                            otp
                        );

                    const phone =
                        getElement(
                            "loginPhone"
                        )
                            ?.value
                            .trim();

                    localStorage.setItem(
                        "furzo_user",
                        JSON.stringify({
                            name:
                                name,
                            phone:
                                phone
                        })
                    );

                    cart =
                        loadCart();

                    updateCartCount();
                    renderProducts();

                    overlay.remove();

                    updateLoginButton();

                    showToast(
                        `Welcome ${name}!`
                    );

                } catch (error) {

                    console.error(
                        "OTP verify error:",
                        error
                    );

                    showToast(
                        "Invalid OTP. Please try again."
                    );

                    verifyOtpButton.disabled =
                        false;

                    verifyOtpButton.textContent =
                        "Verify OTP";

                }

            }
        );

    }


    const changePhoneButton =
        getElement(
            "changePhoneButton"
        );

    if (changePhoneButton) {

        changePhoneButton.addEventListener(
            "click",
            function() {

                getElement(
                    "loginStepTwo"
                ).style.display =
                    "none";

                getElement(
                    "loginStepOne"
                ).style.display =
                    "block";

                getElement(
                    "loginSubtitle"
                ).textContent =
                    "Enter your details to continue";

            }
        );

    }


    overlay.addEventListener(
        "click",
        function(event) {

            if (
                event.target === overlay
            ) {

                overlay.remove();

            }

        }
    );

}


/* =========================================================
   LOGIN BUTTON
   ========================================================= */

function updateLoginButton() {

    const loginButton =
        getElement(
            "loginButton"
        );

    if (!loginButton) {
        return;
    }

    const savedUser =
        localStorage.getItem(
            "furzo_user"
        );

    if (!savedUser) {

        loginButton.textContent =
            "Login";

        return;

    }

    let user;

    try {

        user =
            JSON.parse(
                savedUser
            );

    } catch (error) {

        loginButton.textContent =
            "Login";

        return;

    }

    loginButton.textContent =
        user.name ||
        "Account";


    loginButton.onclick =
        function() {

            const oldMenu =
                getElement(
                    "accountMenu"
                );

            if (oldMenu) {

                oldMenu.remove();

                return;

            }

            const menu =
                document.createElement(
                    "div"
                );

            menu.id =
                "accountMenu";

            menu.style.cssText = `
                position:fixed;
                top:80px;
                right:120px;
                width:240px;
                background:white;
                border-radius:16px;
                padding:10px;
                box-shadow:0 10px 40px rgba(0,0,0,.18);
                z-index:99999;
            `;

            menu.innerHTML = `

                <div
                    style="
                        padding:14px;
                        border-bottom:1px solid #eee;
                    "
                >

                    <div
                        style="
                            font-size:12px;
                            color:#777;
                        "
                    >
                        Logged in as
                    </div>

                    <div
                        style="
                            font-size:17px;
                            font-weight:700;
                            margin-top:4px;
                        "
                    >
                        ${escapeHtml(
                            user.name || ""
                        )}
                    </div>

                    <div
                        style="
                            font-size:13px;
                            color:#777;
                            margin-top:3px;
                        "
                    >
                        ${escapeHtml(
                            user.phone || ""
                        )}
                    </div>

                </div>


                <button
                    id="editProfileButton"
                    type="button"
                    style="
                        width:100%;
                        border:0;
                        background:#0c831f;
                        color:white;
                        padding:13px;
                        border-radius:12px;
                        margin-top:10px;
                        cursor:pointer;
                        font-weight:700;
                    "
                >
                    ✏️ Edit Profile
                </button>


                <button
                    id="myProfileButton"
                    type="button"
                    style="
                        width:100%;
                        border:0;
                        background:white;
                        padding:14px;
                        text-align:left;
                        cursor:pointer;
                    "
                >
                    👤 My Profile
                </button>


                <button
                    id="savedAddressButton"
                    type="button"
                    style="
                        width:100%;
                        border:0;
                        background:white;
                        padding:14px;
                        text-align:left;
                        cursor:pointer;
                    "
                >
                    📍 Saved Address
                </button>


                <button
                    id="addAccountButton"
                    type="button"
                    style="
                        width:100%;
                        border:0;
                        background:white;
                        padding:14px;
                        text-align:left;
                        cursor:pointer;
                    "
                >
                    ➕ Add / Switch Account
                </button>


                <button
                    id="logoutButton"
                    type="button"
                    style="
                        width:100%;
                        border:0;
                        background:white;
                        padding:14px;
                        text-align:left;
                        color:#d93025;
                        cursor:pointer;
                    "
                >
                    🚪 Logout
                </button>

            `;

            document.body.appendChild(
                menu
            );


            const editButton =
                getElement(
                    "editProfileButton"
                );

            if (editButton) {

                editButton.addEventListener(
                    "click",
                    function() {

                        const newName =
                            window.prompt(
                                "Enter your new name:",
                                user.name || ""
                            );

                        if (
                            newName ===
                            null
                        ) {
                            return;
                        }

                        const cleanedName =
                            newName.trim();

                        if (!cleanedName) {

                            showToast(
                                "Please enter your name"
                            );

                            return;

                        }

                        user.name =
                            cleanedName;

                        localStorage.setItem(
                            "furzo_user",
                            JSON.stringify(
                                user
                            )
                        );

                        menu.remove();

                        updateLoginButton();

                        showToast(
                            "Profile updated successfully"
                        );

                    }
                );

            }


            const myProfileButton =
                getElement(
                    "myProfileButton"
                );

            if (myProfileButton) {

                myProfileButton.addEventListener(
                    "click",
                    function() {

                        menu.remove();

                        openProfile();

                    }
                );

            }


            const savedAddressButton =
                getElement(
                    "savedAddressButton"
                );

            if (savedAddressButton) {

                savedAddressButton.addEventListener(
                    "click",
                    function() {

                        menu.remove();

                        changeAddress();

                    }
                );

            }


            const addAccountButton =
                getElement(
                    "addAccountButton"
                );

            if (addAccountButton) {

                addAccountButton.addEventListener(
                    "click",
                    function() {

                        menu.remove();

                        openLogin();

                    }
                );

            }


            const logoutButton =
                getElement(
                    "logoutButton"
                );

            if (logoutButton) {

                logoutButton.addEventListener(
                    "click",
                    function() {

                        localStorage.removeItem(
                            "furzo_user"
                        );

                        menu.remove();

                        cart =
                            loadCart();

                        renderProducts();
                        renderCart();
                        updateCartCount();

                        loginButton.textContent =
                            "Login";

                        loginButton.onclick =
                            openLogin;

                        showToast(
                            "Logged out successfully"
                        );

                    }
                );

            }

        };

}


/* =========================================================
   EVENT HANDLERS
   ========================================================= */

function setupEvents() {


    /* =====================================================
       GLOBAL CLICK
       ===================================================== */

    document.addEventListener(
        "click",
        function(event) {


            /* ADD */

            const addButton =
                event.target.closest(
                    "[data-add]"
                );

            if (addButton) {

                addToCart(
                    Number(
                        addButton.dataset.add
                    )
                );

                return;

            }


            /* PRODUCT */

            const productImage =
                event.target.closest(
                    "[data-product]"
                );

            if (productImage) {

                openProduct(
                    Number(
                        productImage.dataset.product
                    )
                );

                return;

            }


            /* PLUS */

            const plusButton =
                event.target.closest(
                    "[data-plus]"
                );

            if (plusButton) {

                increaseQuantity(
                    Number(
                        plusButton.dataset.plus
                    )
                );

                return;

            }


            /* MINUS */

            const minusButton =
                event.target.closest(
                    "[data-minus]"
                );

            if (minusButton) {

                decreaseQuantity(
                    Number(
                        minusButton.dataset.minus
                    )
                );

                return;

            }


            /* CART PLUS */

            const cartPlus =
                event.target.closest(
                    "[data-cart-plus]"
                );

            if (cartPlus) {

                increaseQuantity(
                    Number(
                        cartPlus.dataset.cartPlus
                    )
                );

                return;

            }


            /* CART MINUS */

            const cartMinus =
                event.target.closest(
                    "[data-cart-minus]"
                );

            if (cartMinus) {

                decreaseQuantity(
                    Number(
                        cartMinus.dataset.cartMinus
                    )
                );

                return;

            }


            /* CATEGORY */

            const categoryButton =
                event.target.closest(
                    "[data-category]"
                );

            if (categoryButton) {

                currentCategory =
                    categoryButton.dataset.category;

                renderCategories();
                renderProducts();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

                return;

            }


            /* DETAIL ADD */

            const detailAdd =
                event.target.closest(
                    "[data-detail-add]"
                );

            if (detailAdd) {

                addToCart(
                    Number(
                        detailAdd.dataset.detailAdd
                    )
                );

                openProduct(
                    Number(
                        detailAdd.dataset.detailAdd
                    )
                );

                return;

            }


            /* DETAIL PLUS */

            const detailPlus =
                event.target.closest(
                    "[data-detail-plus]"
                );

            if (detailPlus) {

                increaseQuantity(
                    Number(
                        detailPlus.dataset.detailPlus
                    )
                );

                return;

            }


            /* DETAIL MINUS */

            const detailMinus =
                event.target.closest(
                    "[data-detail-minus]"
                );

            if (detailMinus) {

                decreaseQuantity(
                    Number(
                        detailMinus.dataset.detailMinus
                    )
                );

                return;

            }


            /* BUY NOW */

            const buyNow =
                event.target.closest(
                    "[data-buy-now]"
                );

            if (buyNow) {

                const id =
                    Number(
                        buyNow.dataset.buyNow
                    );

                if (
                    getQuantity(id) === 0
                ) {

                    addToCart(id);

                }

                closeProduct();
                openCheckout();

                return;

            }


            /* CHECKOUT */

            if (
                event.target.id ===
                "checkoutButton"
            ) {

                openCheckout();

                return;

            }

        }
    );


    /* =====================================================
       CART BUTTON
       ===================================================== */

    const cartButton =
        getElement(
            "cartButton"
        );

    if (cartButton) {

        cartButton.addEventListener(
            "click",
            openCart
        );

    }


    /* =====================================================
       CLOSE CART
       ===================================================== */

    const closeCartButton =
        getElement(
            "closeCartButton"
        );

    if (closeCartButton) {

        closeCartButton.addEventListener(
            "click",
            closeCart
        );

    }


    /* =====================================================
       CLOSE PRODUCT
       ===================================================== */

    const closeProductButton =
        getElement(
            "closeProductButton"
        );

    if (closeProductButton) {

        closeProductButton.addEventListener(
            "click",
            closeProduct
        );

    }


    /* =====================================================
       CLOSE CHECKOUT
       ===================================================== */

    const closeCheckoutButton =
        getElement(
            "closeCheckoutButton"
        );

    if (closeCheckoutButton) {

        closeCheckoutButton.addEventListener(
            "click",
            closeCheckout
        );

    }


    /* =====================================================
       SEARCH
       ===================================================== */

    const searchInput =
        getElement(
            "searchInput"
        );

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function(event) {

                currentSearch =
                    event.target.value;

                renderProducts();

            }
        );

        searchInput.addEventListener(
            "keydown",
            function(event) {

                if (
                    event.key ===
                    "Enter"
                ) {

                    performSearch();

                }

            }
        );

    }


    const searchButton =
        getElement(
            "searchButton"
        );

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            performSearch
        );

    }


    /* =====================================================
       LOCATION
       ===================================================== */

    const locationButton =
        getElement(
            "locationButton"
        );

    if (locationButton) {

        locationButton.addEventListener(
            "click",
            changeAddress
        );

    }


    /* =====================================================
       SHOP NOW
       ===================================================== */

    const shopNowButton =
        getElement(
            "shopNowButton"
        );

    if (shopNowButton) {

        shopNowButton.addEventListener(
            "click",
            function() {

                const section =
                    getElement(
                        "productsSection"
                    );

                if (section) {

                    section.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }


    /* =====================================================
       VIEW ALL
       ===================================================== */

    const viewAllButton =
        getElement(
            "viewAllButton"
        );

    if (viewAllButton) {

        viewAllButton.addEventListener(
            "click",
            function() {

                currentCategory =
                    "All";

                currentSearch =
                    "";

                if (searchInput) {

                    searchInput.value =
                        "";

                }

                renderCategories();
                renderProducts();

            }
        );

    }


    /* =====================================================
       CHECKOUT FORM
       ===================================================== */

    const checkoutForm =
        getElement(
            "checkoutForm"
        );

    if (checkoutForm) {

        checkoutForm.addEventListener(
            "submit",
            placeOrder
        );

    }


    /* =====================================================
       ORDERS BUTTON
       ===================================================== */

    const ordersButton =
        getElement(
            "ordersButton"
        );

    if (ordersButton) {

        ordersButton.addEventListener(
            "click",
            openOrders
        );

    }


    /* =====================================================
       LOGIN
       ===================================================== */

    updateLoginButton();


    /* =====================================================
       OVERLAYS
       ===================================================== */

    selectAll(
        ".overlay"
    ).forEach(
        overlay => {

            overlay.addEventListener(
                "click",
                function(event) {

                    if (
                        event.target ===
                        overlay
                    ) {

                        overlay.classList.remove(
                            "open"
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       ESCAPE
       ===================================================== */

    document.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key ===
                "Escape"
            ) {

                selectAll(
                    ".overlay.open"
                ).forEach(
                    overlay => {

                        overlay.classList.remove(
                            "open"
                        );

                    }
                );

            }

        }
    );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

function initializeApp() {

    cart =
        loadCart();

    renderCategories();
    renderProducts();
    renderCart();
    updateCartCount();
    updateAddress();
    setupEvents();

}


/* =========================================================
   START
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeApp
    );

} else {

    initializeApp();

}


/* =========================================================
   END
   ========================================================= */