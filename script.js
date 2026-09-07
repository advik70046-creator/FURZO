"use strict";

/* =========================================================
   FURZO E-COMMERCE
   Complete JavaScript
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

let cart = loadCart();

let currentCategory = "All";

let currentSearch = "";

let selectedProduct = null;


/* =========================================================
   PRODUCT DATA
========================================================= */

const products = [

    {
        id: 1,
        name: "Fresh Bananas",
        category: "Fruits & Vegetables",
        price: 45,
        unit: "1 kg",
        icon: "🍌",
        discount: 10,
        rating: 4.5,
        stock: 50,
        description: "Fresh and naturally sweet bananas."
    },

    {
        id: 2,
        name: "Shimla Apples",
        category: "Fruits & Vegetables",
        price: 129,
        unit: "4 pcs",
        icon: "🍎",
        discount: 15,
        rating: 4.6,
        stock: 30,
        description: "Fresh and crunchy Shimla apples."
    },

    {
        id: 3,
        name: "Fresh Mango",
        category: "Fruits & Vegetables",
        price: 199,
        unit: "1 kg",
        icon: "🥭",
        discount: 10,
        rating: 4.8,
        stock: 25,
        description: "Sweet and juicy seasonal mangoes."
    },

    {
        id: 4,
        name: "Tomato",
        category: "Fruits & Vegetables",
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
        category: "Fruits & Vegetables",
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
        category: "Fruits & Vegetables",
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
        category: "Fruits & Vegetables",
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
        category: "Fruits & Vegetables",
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
        category: "Fruits & Vegetables",
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
        category: "Fruits & Vegetables",
        price: 49,
        unit: "2 pcs",
        icon: "🌽",
        discount: 10,
        rating: 4.6,
        stock: 35,
        description: "Fresh sweet corn."
    },


    /* =========================
       DAIRY
    ========================= */

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


    /* =========================
       SNACKS
    ========================= */

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


    /* =========================
       DRINKS
    ========================= */

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


    /* =========================
       INSTANT FOOD
    ========================= */

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


    /* =========================
       TEA COFFEE
    ========================= */

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


    /* =========================
       BISCUITS
    ========================= */

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


    /* =========================
       CHOCOLATES
    ========================= */

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


    /* =========================
       STAPLES
    ========================= */

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


    /* =========================
       CLEANING
    ========================= */

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


    /* =========================
       PERSONAL CARE
    ========================= */

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


    /* =========================
       BABY CARE
    ========================= */

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


    /* =========================
       PET CARE
    ========================= */

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
   CART STORAGE
========================================================= */
function getCartStorageKey() {

    const savedUser =
        localStorage.getItem("furzo_user");

    if (!savedUser) {
        return "furzo_cart_guest";
    }

    const user =
        JSON.parse(savedUser);

    return "furzo_cart_" + user.phone;
}
function loadCart() {

    try {

        const savedCart =
        localStorage.getItem(getCartStorageKey());

        if (!savedCart) {

            return [];

        }

        const parsed =
            JSON.parse(savedCart);

        if (!Array.isArray(parsed)) {

            return [];

        }

        return parsed;

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
   PRODUCT FUNCTIONS
========================================================= */

function getProductById(id) {

    return products.find(
        product =>
            Number(product.id) === Number(id)
    );

}


function getCategories() {

    const categories = [

        "All"

    ];

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
   CART QUANTITY
========================================================= */

function getQuantity(id) {

    const item = cart.find(
        cartItem =>
            Number(cartItem.id) === Number(id)
    );

    if (!item) {

        return 0;

    }

    return Number(item.quantity);

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
                Number(item.id) === Number(id)
        );


    if (existing) {

        if (
            existing.quantity >=
            product.stock
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
   REMOVE / DECREASE
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


    return `

        <article
            class="product-card"
        >

            <div
                class="product-image"
                data-product="${product.id}"
                title="View ${escapeHtml(product.name)}"
            >
                ${product.icon}
            </div>


            <span
                class="discount-badge"
            >
                ${product.discount}% OFF
            </span>


            <h3
                class="product-name"
            >
                ${escapeHtml(product.name)}
            </h3>


            <div
                class="product-unit"
            >
                ${escapeHtml(product.unit)}
                · ⭐ ${product.rating}
            </div>


            <div
                class="product-bottom"
            >

                <span
                    class="product-price"
                >
                    ${formatPrice(product.price)}
                </span>

                ${actionHtml}

            </div>

        </article>

    `;

}


/* =========================================================
   FILTER PRODUCTS
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

            <div
                class="empty-result"
            >

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
            .map(
                product =>
                    createProductCard(
                        product
                    )
            )
            .join("");

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
   CATEGORY ICON
========================================================= */

function getCategoryIcon(category) {

    const icons = {

        "All": "🛍️",

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

        "Home & Kitchen": "🏠",

        "Personal Care": "🧴",

        "Baby Care": "👶",

        "Pet Care": "🐶"

    };


    return icons[category] || "🛒";

}


/* =========================================================
   CART TOTAL
========================================================= */

function getSubtotal() {

    return cart.reduce(
        (
            total,
            item
        ) => {

            const product =
                getProductById(
                    item.id
                );


            if (!product) {

                return total;

            }


            return (
                total +
                product.price *
                item.quantity
            );

        },
        0
    );

}


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


function getGrandTotal() {

    return (
        getSubtotal() +
        getDeliveryFee()
    );

}


/* =========================================================
   CART ITEM HTML
========================================================= */

function createCartItem(item) {

    const product =
        getProductById(item.id);


    if (!product) {

        return "";

    }


    const total =
        product.price *
        item.quantity;


    return `

        <div
            class="cart-item"
        >

            <div
                class="cart-item-icon"
            >
                ${product.icon}
            </div>


            <div>

                <div
                    class="cart-item-name"
                >
                    ${escapeHtml(product.name)}
                </div>


                <small>
                    ${escapeHtml(product.unit)}
                    ·
                    ${formatPrice(product.price)}
                </small>


                <div
                    class="cart-quantity"
                >

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


            <div
                class="cart-item-price"
            >
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

            summaryElement.innerHTML =
                "";

        }


        return;

    }


    itemsElement.innerHTML =
        cart
            .map(
                item =>
                    createCartItem(item)
            )
            .join("");


    const subtotal =
        getSubtotal();


    const delivery =
        getDeliveryFee();


    const total =
        getGrandTotal();


    if (summaryElement) {

        summaryElement.innerHTML = `

            <div
                class="summary-row"
            >
                <span>
                    Subtotal
                </span>

                <strong>
                    ${formatPrice(subtotal)}
                </strong>
            </div>


            <div
                class="summary-row"
            >
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
   OPEN CART
========================================================= */

function openCart() {

    renderCart();

    const overlay =
        getElement("cartOverlay");


    if (overlay) {

        overlay.classList.add(
            "open"
        );

    }

}


/* =========================================================
   CLOSE CART
========================================================= */

function closeCart() {

    const overlay =
        getElement("cartOverlay");


    if (overlay) {

        overlay.classList.remove(
            "open"
        );

    }

}


/* =========================================================
   PRODUCT DETAIL
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


    const buttonHtml =
        quantity > 0

            ? `

                <div
                    class="quantity-control"
                    style="margin-top:15px;"
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
                >
                    ADD TO CART
                </button>

            `;


    detail.innerHTML = `

        <div
            class="product-detail"
        >

            <div>

                <div
                    class="main-product-image"
                    id="mainProductImage"
                >
                    ${product.icon}
                </div>


                <div
                    class="image-gallery"
                >

                    <button
                        type="button"
                        class="gallery-button"
                        data-gallery-icon="${product.icon}"
                    >
                        ${product.icon}
                    </button>

                    <button
                        type="button"
                        class="gallery-button"
                        data-gallery-icon="🛍️"
                    >
                        🛍️
                    </button>

                    <button
                        type="button"
                        class="gallery-button"
                        data-gallery-icon="📦"
                    >
                        📦
                    </button>

                    <button
                        type="button"
                        class="gallery-button"
                        data-gallery-icon="✨"
                    >
                        ✨
                    </button>

                </div>

            </div>


            <div>

                <span
                    class="discount-badge"
                >
                    ${product.discount}% OFF
                </span>


                <h1>
                    ${escapeHtml(product.name)}
                </h1>


                <p
                    class="detail-description"
                >
                    ${escapeHtml(product.description)}
                </p>


                <p>
                    <strong>
                        Pack:
                    </strong>

                    ${escapeHtml(product.unit)}
                </p>


                <p
                    style="margin-top:8px;"
                >
                    <strong>
                        Rating:
                    </strong>

                    ⭐ ${product.rating}
                </p>


                <p
                    style="margin-top:8px;"
                >
                    <strong>
                        Stock:
                    </strong>

                    ${product.stock} available
                </p>


                <div
                    class="detail-price"
                >
                    ${formatPrice(product.price)}
                </div>


                <div
                    id="detailControls"
                >
                    ${buttonHtml}
                </div>


                <button
                    type="button"
                    class="view-all"
                    style="margin-top:12px;"
                    data-buy-now="${product.id}"
                >
                    Buy now
                </button>

            </div>

        </div>

    `;


    const overlay =
        getElement("productOverlay");


    if (overlay) {

        overlay.classList.add(
            "open"
        );

    }

}


/* =========================================================
   CLOSE PRODUCT
========================================================= */

function closeProduct() {

    const overlay =
        getElement("productOverlay");


    if (overlay) {

        overlay.classList.remove(
            "open"
        );

    }

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
        getElement("checkoutOverlay");


    if (overlay) {

        overlay.classList.add(
            "open"
        );

    }

}


function closeCheckout() {

    const overlay =
        getElement("checkoutOverlay");


    if (overlay) {

        overlay.classList.remove(
            "open"
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
   SAVE ORDER
========================================================= */

function saveOrder(order) {

    try {

        const oldOrders =
            JSON.parse(
                localStorage.getItem(
                    ORDER_STORAGE_KEY
                ) || "[]"
            );


        oldOrders.push(order);


        localStorage.setItem(
            ORDER_STORAGE_KEY,
            JSON.stringify(
                oldOrders
            )
        );

    } catch (error) {

        console.error(
            "Order saving error:",
            error
        );

    }

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
        getElement("addressText");


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


    if (address.length > 30) {

        addressElement.textContent =
            address.substring(
                0,
                30
            ) + "...";

    } else {

        addressElement.textContent =
            address;

    }

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer = null;


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
            () => {

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
        getElement("searchInput");


    if (!input) {

        return;

    }


    currentSearch =
        input.value;


    renderProducts();

}


/* =========================================================
   EVENTS
========================================================= */


/*
    ADD BUTTON
*/

document.addEventListener(
    "click",
    function(event) {

        const addButton =
            event.target.closest(
                "[data-add]"
            );


        if (addButton) {

            const id =
                Number(
                    addButton.dataset.add
                );


            addToCart(id);

            return;

        }


        /*
            PRODUCT IMAGE
        */

        const productImage =
            event.target.closest(
                "[data-product]"
            );


        if (productImage) {

            const id =
                Number(
                    productImage.dataset.product
                );


            openProduct(id);

            return;

        }


        /*
            PLUS
        */

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


        /*
            MINUS
        */

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


        /*
            CART PLUS
        */

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


        /*
            CART MINUS
        */

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


        /*
            CATEGORY
        */

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


        /*
            DETAIL ADD
        */

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


        /*
            DETAIL PLUS
        */

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


            openProduct(
                Number(
                    detailPlus.dataset.detailPlus
                )
            );


            return;

        }


        /*
            DETAIL MINUS
        */

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


            openProduct(
                Number(
                    detailMinus.dataset.detailMinus
                )
            );


            return;

        }


        /*
            BUY NOW
        */

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


        /*
            GALLERY IMAGE
        */

        const gallery =
            event.target.closest(
                "[data-gallery-icon]"
            );


        if (gallery) {

            const mainImage =
                getElement(
                    "mainProductImage"
                );


            if (mainImage) {

                mainImage.textContent =
                    gallery.dataset.galleryIcon;

            }


            return;

        }


        /*
            CHECKOUT
        */

        if (
            event.target.id ===
            "checkoutButton"
        ) {

            openCheckout();

            return;

        }

    }
);
function openProfile() {

    const userData =
        localStorage.getItem("furzo_user");

    if (!userData) {
        showToast("Please login first");
        return;
    }

    const user =
        JSON.parse(userData);

    const oldProfile =
        document.getElementById("profileOverlay");

    if (oldProfile) {
        oldProfile.remove();
    }

    const overlay =
        document.createElement("div");

    overlay.id = "profileOverlay";
    overlay.className = "overlay open";

    overlay.innerHTML = `

        <div style="
            background:#fff;
            width:min(420px,92vw);
            border-radius:22px;
            padding:28px;
            position:relative;
            box-shadow:0 20px 60px rgba(0,0,0,.18);
        ">

            <button
                type="button"
                id="closeProfileButton"
                onclick="document.getElementById('profileOverlay').remove()"
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

            <h2 style="
                margin:0 0 8px;
                font-size:28px;
            ">
                My Profile
            </h2>

            <p style="
                margin:0 0 24px;
                color:#777;
            ">
                Your Furzo account details
            </p>

            <div style="
                background:#f7f7f7;
                border-radius:16px;
                padding:18px;
                margin-bottom:12px;
            ">
                <div style="
                    font-size:12px;
                    color:#777;
                    margin-bottom:5px;
                ">
                    Name
                </div>

                <div style="
                    font-size:17px;
                    font-weight:700;
                ">
                    ${user.name}
                </div>
            </div>

            <div style="
                background:#f7f7f7;
                border-radius:16px;
                padding:18px;
            ">
                <div style="
                    font-size:12px;
                    color:#777;
                    margin-bottom:5px;
                ">
                    Mobile Number
                </div>

                <div style="
                    font-size:17px;
                    font-weight:700;
                ">
                    ${user.phone}
                </div>
            </div>

        </div>

    `;

    document.body.appendChild(overlay);

    document
        .getElementById("closeProfileButton")
        .addEventListener(
            "click",
            () => overlay.remove()
        );

    overlay.addEventListener(
        "click",
        function(event) {
            if (event.target === overlay) {
                overlay.remove();
            }
        }
    );
}
/* =========================================================
   MY ORDERS
========================================================= */

function openOrders() {

    const orders = JSON.parse(
        localStorage.getItem(ORDER_STORAGE_KEY) || "[]"
    );

    const oldOverlay = document.getElementById("ordersOverlay");

    if (oldOverlay) {
        oldOverlay.remove();
    }

    const overlay = document.createElement("div");

    overlay.id = "ordersOverlay";
    overlay.className = "overlay open";

    let ordersHTML = "";

    if (!orders.length) {

        ordersHTML = `
            <div style="
                text-align:center;
                padding:50px 20px;
            ">
                <div style="font-size:60px;">📦</div>
                <h2>No orders yet</h2>
                <p style="color:#777;">
                    Your placed orders will appear here.
                </p>
            </div>
        `;

    } else {

        ordersHTML = orders
            .slice()
            .reverse()
            .map(order => {

                const orderDate =
                    new Date(order.createdAt)
                    .toLocaleString("en-IN");

                const itemsHTML =
                    order.items.map(item => {

                        const product =
                            products.find(
                                p => p.id === item.id
                            );

                        if (!product) {
                            return "";
                        }

                        return `
                            <div style="
                                display:flex;
                                justify-content:space-between;
                                padding:8px 0;
                                border-bottom:1px solid #eee;
                            ">
                                <span>
                                    ${escapeHtml(product.name)}
                                    × ${item.quantity}
                                </span>

                                <strong>
                                    ${formatPrice(
                                        product.price *
                                        item.quantity
                                    )}
                                </strong>
                            </div>
                        `;

                    }).join("");

                return `
                    <div style="
                        border:1px solid #e5e5e5;
                        border-radius:16px;
                        padding:18px;
                        margin-bottom:14px;
                        background:#fff;
                    ">

                        <div style="
                            display:flex;
                            justify-content:space-between;
                            align-items:center;
                            margin-bottom:10px;
                        ">
                            <strong>
                                Order ${order.id}
                            </strong>

                            <span style="
                                color:#078b18;
                                font-weight:700;
                            ">
                                Placed
                            </span>
                        </div>

                        <div style="
                            color:#777;
                            font-size:13px;
                            margin-bottom:12px;
                        ">
                            ${orderDate}
                        </div>

                        ${itemsHTML}

                        <div style="
                            display:flex;
                            justify-content:space-between;
                            margin-top:14px;
                            font-size:17px;
                        ">
                            <strong>Total</strong>
                            <strong>
                                ${formatPrice(order.total)}
                            </strong>
                        </div>

                        <div style="
                            margin-top:10px;
                            color:#666;
                            font-size:14px;
                        ">
                            Payment: ${escapeHtml(
                                order.customer.payment || "N/A"
                            )}
                        </div>

                    </div>
                `;

            })
            .join("");
    }

    overlay.innerHTML = `
        <div style="
            background:#fff;
            width:min(720px,92vw);
            max-height:85vh;
            overflow:auto;
            border-radius:22px;
            padding:24px;
            position:relative;
        ">

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

            <h2 style="
                margin:0 0 22px;
                font-size:28px;
            ">
                My Orders
            </h2>

            ${ordersHTML}

        </div>
    `;

    document.body.appendChild(overlay);

    document
        .getElementById("closeOrdersButton")
        .addEventListener(
            "click",
            () => overlay.remove()
        );

    overlay.addEventListener(
        "click",
        event => {

            if (event.target === overlay) {
                overlay.remove();
            }

        }
    );
}


/* =========================================================
   ORDERS BUTTON
========================================================= */

const ordersButton =
    getElement("ordersButton");

if (ordersButton) {

    ordersButton.addEventListener(
        "click",
        openOrders
    );

}
/* =========================================================
   LOGIN
========================================================= */

function openLogin() {

    const oldLogin =
        document.getElementById("loginOverlay");

    if (oldLogin) {
        oldLogin.remove();
    }

    const overlay =
        document.createElement("div");

    overlay.id = "loginOverlay";
    overlay.className = "overlay open";

    overlay.innerHTML = `

        <div style="
            background:#fff;
            width:min(420px,92vw);
            border-radius:22px;
            padding:28px;
            position:relative;
            box-shadow:0 20px 60px rgba(0,0,0,.18);
        ">

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

            <h2 style="
                margin:0 0 8px;
                font-size:28px;
            ">
                Welcome to Furzo
            </h2>

            <p style="
                margin:0 0 22px;
                color:#777;
            ">
                Login to continue shopping
            </p>

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
                placeholder="Enter mobile number"
                maxlength="10"
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
                id="loginSubmitButton"
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
                Continue
            </button>

        </div>

    `;

    document.body.appendChild(overlay);


    document
        .getElementById("closeLoginButton")
        .addEventListener(
            "click",
            () => overlay.remove()
        );


    document
        .getElementById("loginSubmitButton")
        .addEventListener(
            "click",
            function() {

                const name =
                    document
                        .getElementById("loginName")
                        .value
                        .trim();

                const phone =
                    document
                        .getElementById("loginPhone")
                        .value
                        .trim();


                if (!name) {

                    showToast(
                        "Please enter your name"
                    );

                    return;

                }


                if (
                    !/^[0-9]{10}$/.test(phone)
                ) {

                    showToast(
                        "Enter a valid 10-digit mobile number"
                    );

                    return;

                }


                localStorage.setItem(
                    "furzo_user",
                    JSON.stringify({
                        name: name,
                        phone: phone
                    })
                );

cart = loadCart();
updateCartCount();
updateAllProducts();
                overlay.remove();
if (loginButton) {
    loginButton.textContent = name;
}

                showToast(
                    `Welcome ${name}!`
                );

            }
        );


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

const loginButton =
    getElement("loginButton");

const savedUser =
    localStorage.getItem("furzo_user");

if (savedUser && loginButton) {

    const user =
        JSON.parse(savedUser);

    loginButton.textContent =
        user.name;

    loginButton.addEventListener(
        "click",
        function () {

            const oldMenu =
                document.getElementById(
                    "accountMenu"
                );

            if (oldMenu) {
                oldMenu.remove();
                return;
            }

            const menu =
                document.createElement("div");

            menu.id =
                "accountMenu";

            menu.style.cssText = `
                position:fixed;
                top:80px;
                right:120px;
                width:220px;
                background:white;
                border-radius:16px;
                padding:10px;
                box-shadow:0 10px 40px rgba(0,0,0,.18);
                z-index:9999;
            `;

            menu.innerHTML = `

                <div style="
                    padding:14px;
                    border-bottom:1px solid #eee;
                ">
                    <div style="
                        font-size:12px;
                        color:#777;
                    ">
                        Logged in as
                    </div>

                    <div style="
                        font-size:17px;
                        font-weight:700;
                        margin-top:4px;
                    ">
                        ${user.name}
                    </div>

                    <div style="
                        font-size:13px;
                        color:#777;
                        margin-top:3px;
                    ">
                        ${user.phone}
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
        font-size:15px;
        font-weight:700;
        cursor:pointer;
        margin-top:18px;
    "
>
    ✏️ Edit Profile
</button>

                    </div>
                </div>
<button
    id="myProfileButton"
    type="button"
    style="
        width:100%;
        border:0;
        background:white;
        padding:14px;
        text-align:left;
        font-size:15px;
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
        font-size:15px;
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
                        font-size:15px;
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
                        font-size:15px;
                        color:#d93025;
                        cursor:pointer;
                    "
                >
                    🚪 Logout
                </button>

            `;

            document.body.appendChild(menu);
           document
    .getElementById("editProfileButton")
    .addEventListener(
        "click",
        function () {

            const newName =
                window.prompt(
                    "Enter your new name:",
                    user.name
                );

            if (newName === null) {
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
                JSON.stringify(user)
            );

            menu.remove();

            loginButton.textContent =
                user.name;

            showToast(
                "Profile updated successfully"
            );
        }
    ); 
            document
    .getElementById("savedAddressButton")
    .addEventListener(
        "click",
        function () {
            menu.remove();
            changeAddress();
        }
    );
document
    .getElementById("myProfileButton")
    .addEventListener(
        "click",
        function () {
            menu.remove();
            openProfile();
        }
    );            
document
    .getElementById(
        "logoutButton"
)
                .addEventListener(
                    "click",
                    function () {

                        localStorage.removeItem(
                            "furzo_user"
                        );

                        menu.remove();
                        cart = loadCart();
updateCartCount();
updateAllProducts();
                        loginButton.textContent =
                            "Login";

                        showToast(
                            "Logged out successfully"
                        );
                    }
                );

            document
                .getElementById(
                    "addAccountButton"
                )
                .addEventListener(
                    "click",
                    function () {

                        menu.remove();

                        openLogin();
                    }
                );
        }
    );

} else if (loginButton) {

    loginButton.addEventListener(
        "click",
        openLogin
    );
}

/* =========================================================
   CART BUTTON
========================================================= */

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


/* =========================================================
   CLOSE CART
========================================================= */

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


/* =========================================================
   CLOSE PRODUCT
========================================================= */

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


/* =========================================================
   CLOSE CHECKOUT
========================================================= */

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


/* =========================================================
   SEARCH INPUT
========================================================= */

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


/* =========================================================
   SEARCH BUTTON
========================================================= */

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


/* =========================================================
   LOCATION
========================================================= */

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


/* =========================================================
   SHOP NOW
========================================================= */

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

                    behavior:
                        "smooth"

                });

            }

        }
    );

}


/* =========================================================
   VIEW ALL
========================================================= */

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


/* =========================================================
   CHECKOUT FORM
========================================================= */

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


/* =========================================================
   OVERLAY CLOSE
========================================================= */

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


/* =========================================================
   ESC KEY
========================================================= */

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


/* =========================================================
   INITIALIZE
========================================================= */

function initializeApp() {

    renderCategories();

    renderProducts();

    renderCart();

    updateCartCount();

    updateAddress();

}


/* =========================================================
   START APP
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