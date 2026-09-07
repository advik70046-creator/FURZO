// ==========================================
// FURZO - GROCERY CART SYSTEM
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ------------------------------------------
    // CART DATA
    // ------------------------------------------

    let cart = JSON.parse(localStorage.getItem("furzoCart")) || [];


    // ------------------------------------------
    // MAIN ELEMENTS
    // ------------------------------------------

    const addButtons = document.querySelectorAll(".add-btn");
    const cartButton = document.querySelector("#cartBtn");
    const cartCount = document.querySelector(".cart-count");
    const searchInput = document.querySelector(".search");


    // ------------------------------------------
    // SAVE CART
    // ------------------------------------------

    function saveCart() {
        localStorage.setItem("furzoCart", JSON.stringify(cart));
    }


    // ------------------------------------------
    // GET PRODUCT INFORMATION
    // ------------------------------------------

    function getProductData(product) {

        const nameElement = product.querySelector("h3");
        const priceElement = product.querySelector(".product-bottom b");

        if (!nameElement || !priceElement) {
            return null;
        }

        const name = nameElement.textContent.trim();

        const priceText = priceElement.textContent
            .replace("₹", "")
            .replace(",", "")
            .trim();

        const price = Number(priceText);

        return {
            name: name,
            price: price
        };
    }


    // ------------------------------------------
    // ADD PRODUCT TO CART
    // ------------------------------------------

    function addToCart(product) {

        const productData = getProductData(product);

        if (!productData) {
            console.error("Product information not found.");
            return;
        }

        const existingProduct = cart.find(function (item) {
            return item.name === productData.name;
        });


        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            cart.push({
                name: productData.name,
                price: productData.price,
                quantity: 1
            });

        }


        saveCart();
        updateCartCount();
        updateAllProducts();

        showToast(productData.name + " added to cart!");
    }


    // ------------------------------------------
    // REMOVE PRODUCT COMPLETELY
    // ------------------------------------------

    function removeFromCart(name) {

        cart = cart.filter(function (item) {
            return item.name !== name;
        });

        saveCart();
        updateCartCount();
        updateAllProducts();
        renderCart();
    }


    // ------------------------------------------
    // INCREASE QUANTITY
    // ------------------------------------------

    function increaseQuantity(name) {

        const item = cart.find(function (product) {
            return product.name === name;
        });

        if (item) {
            item.quantity += 1;
        }

        saveCart();
        updateCartCount();
        updateAllProducts();
        renderCart();
    }


    // ------------------------------------------
    // DECREASE QUANTITY
    // ------------------------------------------

    function decreaseQuantity(name) {

        const item = cart.find(function (product) {
            return product.name === name;
        });


        if (!item) {
            return;
        }


        item.quantity -= 1;


        if (item.quantity <= 0) {

            removeFromCart(name);
            return;

        }


        saveCart();
        updateCartCount();
        updateAllProducts();
        renderCart();
    }


    // ------------------------------------------
    // UPDATE CART COUNT
    // ------------------------------------------

    function updateCartCount() {

        if (!cartCount) {
            return;
        }

        const totalItems = cart.reduce(function (total, item) {
            return total + item.quantity;
        }, 0);


        cartCount.textContent = totalItems;


        if (totalItems === 0) {
            cartCount.style.display = "none";
        } else {
            cartCount.style.display = "inline-block";
        }
    }


    // ------------------------------------------
    // UPDATE PRODUCT CARDS
    // ------------------------------------------

    function updateAllProducts() {

        const products = document.querySelectorAll(".product");

        products.forEach(function (product) {
            updateProductQuantity(product);
        });
    }


    // ------------------------------------------
    // UPDATE SINGLE PRODUCT CARD
    // ------------------------------------------

    function updateProductQuantity(product) {

        const productData = getProductData(product);

        if (!productData) {
            return;
        }


        const item = cart.find(function (cartItem) {
            return cartItem.name === productData.name;
        });


        const bottom = product.querySelector(".product-bottom");

        if (!bottom) {
            return;
        }


        let oldControls = product.querySelector(
            ".product-quantity-controls"
        );


        let addButton = product.querySelector(".add-btn");


        // --------------------------------------
        // PRODUCT NOT IN CART
        // --------------------------------------

        if (!item) {

            if (oldControls) {
                oldControls.remove();
            }

            if (addButton) {
                addButton.style.display = "inline-block";
            }

            return;
        }


        // --------------------------------------
        // PRODUCT IS IN CART
        // --------------------------------------

        if (addButton) {
            addButton.style.display = "none";
        }


        if (!oldControls) {

            oldControls = document.createElement("div");

            oldControls.className = "product-quantity-controls";

            oldControls.innerHTML = `
                <button class="quantity-minus">−</button>
                <span class="quantity-number">1</span>
                <button class="quantity-plus">+</button>
            `;


            bottom.appendChild(oldControls);


            const minusButton = oldControls.querySelector(
                ".quantity-minus"
            );

            const plusButton = oldControls.querySelector(
                ".quantity-plus"
            );


            minusButton.addEventListener("click", function () {

                decreaseQuantity(productData.name);

            });


            plusButton.addEventListener("click", function () {

                increaseQuantity(productData.name);

            });

        }


        const quantityNumber = oldControls.querySelector(
            ".quantity-number"
        );


        if (quantityNumber) {
            quantityNumber.textContent = item.quantity;
        }
    }


    // ------------------------------------------
    // ADD BUTTON EVENTS
    // ------------------------------------------

    addButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const product = button.closest(".product");

            if (!product) {
                return;
            }

            addToCart(product);

        });

    });


    // ------------------------------------------
    // CREATE CART UI
    // ------------------------------------------

    function createCartUI() {

        if (document.querySelector("#cartOverlay")) {
            return;
        }


        const cartOverlay = document.createElement("div");

        cartOverlay.id = "cartOverlay";

        cartOverlay.innerHTML = `

            <div class="cart-overlay-background"></div>

            <div class="cart-panel">

                <div class="cart-header">

                    <div>
                        <h2>Your Cart</h2>
                        <p class="cart-items-label">0 items</p>
                    </div>

                    <button id="closeCartButton">
                        ×
                    </button>

                </div>


                <div id="cartItems">

                </div>


                <div class="cart-footer">

                    <div class="bill-row">
                        <span>Subtotal</span>
                        <strong id="cartSubtotal">₹0</strong>
                    </div>

                    <div class="bill-row">
                        <span>Delivery</span>
                        <strong id="cartDelivery">₹0</strong>
                    </div>

                    <div class="bill-row total-row">
                        <span>Total</span>
                        <strong id="cartTotal">₹0</strong>
                    </div>


                    <button id="checkoutButton">
                        Proceed to Checkout
                    </button>

                </div>

            </div>
        `;


        document.body.appendChild(cartOverlay);


        // CLOSE BUTTON

        const closeButton = document.querySelector(
            "#closeCartButton"
        );


        closeButton.addEventListener("click", function () {
            closeCart();
        });


        // BACKGROUND CLICK

        const background = document.querySelector(
            ".cart-overlay-background"
        );


        background.addEventListener("click", function () {
            closeCart();
        });


        // CHECKOUT

        const checkoutButton = document.querySelector(
            "#checkoutButton"
        );


        checkoutButton.addEventListener("click", function () {

            if (cart.length === 0) {

                showToast("Your cart is empty!");

                return;
            }


            showToast("Checkout coming soon!");

        });


        renderCart();
    }


    // ------------------------------------------
    // OPEN CART
    // ------------------------------------------

    function openCart() {

        createCartUI();

        const overlay = document.querySelector("#cartOverlay");

        if (overlay) {
            overlay.classList.add("cart-open");
        }

        renderCart();
    }


    // ------------------------------------------
    // CLOSE CART
    // ------------------------------------------

    function closeCart() {

        const overlay = document.querySelector("#cartOverlay");

        if (overlay) {
            overlay.classList.remove("cart-open");
        }
    }


    // ------------------------------------------
    // CART BUTTON
    // ------------------------------------------

    if (cartButton) {

        cartButton.addEventListener("click", function () {

            openCart();

        });

    } else {

        console.warn(
            "Cart button #cartBtn was not found in HTML."
        );

    }


    // ------------------------------------------
    // RENDER CART
    // ------------------------------------------

    function renderCart() {

        const cartItems = document.querySelector("#cartItems");

        if (!cartItems) {
            return;
        }


        cartItems.innerHTML = "";


        // EMPTY CART

        if (cart.length === 0) {

            cartItems.innerHTML = `

                <div class="empty-cart">

                    <div class="empty-cart-icon">
                        🛒
                    </div>

                    <h3>Your cart is empty</h3>

                    <p>
                        Add some groceries to get started.
                    </p>

                </div>

            `;

            updateBill();

            return;
        }


        // CART ITEMS

        cart.forEach(function (item) {

            const cartItem = document.createElement("div");

            cartItem.className = "cart-item";


            const itemTotal = item.price * item.quantity;


            cartItem.innerHTML = `

                <div class="cart-item-info">

                    <h3>${item.name}</h3>

                    <p>
                        ₹${item.price} each
                    </p>

                </div>


                <div class="cart-item-right">

                    <div class="cart-quantity">

                        <button class="cart-minus">
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button class="cart-plus">
                            +
                        </button>

                    </div>


                    <strong>
                        ₹${itemTotal}
                    </strong>

                    <button class="cart-remove">
                        Remove
                    </button>

                </div>

            `;


            const minusButton = cartItem.querySelector(
                ".cart-minus"
            );


            const plusButton = cartItem.querySelector(
                ".cart-plus"
            );


            const removeButton = cartItem.querySelector(
                ".cart-remove"
            );


            minusButton.addEventListener("click", function () {

                decreaseQuantity(item.name);

            });


            plusButton.addEventListener("click", function () {

                increaseQuantity(item.name);

            });


            removeButton.addEventListener("click", function () {

                removeFromCart(item.name);

            });


            cartItems.appendChild(cartItem);

        });


        updateBill();
    }


    // ------------------------------------------
    // UPDATE BILL
    // ------------------------------------------

    function updateBill() {

        const subtotalElement = document.querySelector(
            "#cartSubtotal"
        );


        const deliveryElement = document.querySelector(
            "#cartDelivery"
        );


        const totalElement = document.querySelector(
            "#cartTotal"
        );


        const itemsLabel = document.querySelector(
            ".cart-items-label"
        );


        let subtotal = 0;

        let totalItems = 0;


        cart.forEach(function (item) {

            subtotal += item.price * item.quantity;

            totalItems += item.quantity;

        });


        // Free delivery above ₹199

        let delivery = 0;

        if (subtotal > 0 && subtotal < 199) {
            delivery = 25;
        }


        const total = subtotal + delivery;


        if (subtotalElement) {
            subtotalElement.textContent =
                "₹" + subtotal;
        }


        if (deliveryElement) {

            if (delivery === 0 && subtotal > 0) {
                deliveryElement.textContent = "FREE";
            } else {
                deliveryElement.textContent =
                    "₹" + delivery;
            }

        }


        if (totalElement) {
            totalElement.textContent =
                "₹" + total;
        }


        if (itemsLabel) {

            itemsLabel.textContent =
                totalItems +
                (totalItems === 1 ? " item" : " items");

        }
    }


    // ------------------------------------------
    // TOAST MESSAGE
    // ------------------------------------------

    function showToast(message) {

        let toast = document.querySelector("#furzoToast");


        if (!toast) {

            toast = document.createElement("div");

            toast.id = "furzoToast";

            document.body.appendChild(toast);

        }


        toast.textContent = message;

        toast.classList.add("show");


        setTimeout(function () {

            toast.classList.remove("show");

        }, 2000);
    }


    // ------------------------------------------
    // SEARCH
    // ------------------------------------------

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const searchText =
                searchInput.value.toLowerCase().trim();


            const products =
                document.querySelectorAll(".product");


            products.forEach(function (product) {

                const nameElement =
                    product.querySelector("h3");


                if (!nameElement) {
                    return;
                }


                const productName =
                    nameElement.textContent
                    .toLowerCase();


                if (
                    productName.includes(searchText)
                ) {

                    product.style.display = "";

                } else {

                    product.style.display = "none";

                }

            });

        });

    }


    // ------------------------------------------
    // ESCAPE KEY CLOSE CART
    // ------------------------------------------

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeCart();
        }

    });


    // ------------------------------------------
    // ADD CART CSS
    // ------------------------------------------

    const style = document.createElement("style");

    style.textContent = `

        /* =====================================
           PRODUCT QUANTITY
        ===================================== */

        .product-quantity-controls {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-left: auto;
        }


        .product-quantity-controls button {
            width: 32px;
            height: 32px;
            border: none;
            border-radius: 8px;
            background: #145c32;
            color: white;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
        }


        .product-quantity-controls button:hover {
            opacity: 0.85;
        }


        .product-quantity-controls span {
            min-width: 20px;
            text-align: center;
            font-weight: bold;
        }


        /* =====================================
           CART OVERLAY
        ===================================== */

        #cartOverlay {
            position: fixed;
            inset: 0;
            z-index: 9999;
            visibility: hidden;
            pointer-events: none;
        }


        #cartOverlay.cart-open {
            visibility: visible;
            pointer-events: auto;
        }


        .cart-overlay-background {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.45);
            opacity: 0;
            transition: opacity 0.25s ease;
        }


        #cartOverlay.cart-open .cart-overlay-background {
            opacity: 1;
        }


        /* =====================================
           CART PANEL
        ===================================== */

        .cart-panel {
            position: absolute;
            top: 0;
            right: 0;
            width: min(460px, 100%);
            height: 100%;
            background: white;
            box-shadow: -5px 0 25px rgba(0, 0, 0, 0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            display: flex;
            flex-direction: column;
        }


        #cartOverlay.cart-open .cart-panel {
            transform: translateX(0);
        }


        /* =====================================
           CART HEADER
        ===================================== */

        .cart-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 22px;
            border-bottom: 1px solid #eee;
        }


        .cart-header h2 {
            margin: 0;
            font-size: 24px;
        }


        .cart-items-label {
            margin: 5px 0 0;
            color: #777;
            font-size: 14px;
        }


        #closeCartButton {
            width: 38px;
            height: 38px;
            border: none;
            border-radius: 50%;
            background: #f2f2f2;
            font-size: 25px;
            cursor: pointer;
        }


        /* =====================================
           CART ITEMS
        ===================================== */

        #cartItems {
            flex: 1;
            overflow-y: auto;
            padding: 15px 20px;
        }


        .cart-item {
            display: flex;
            justify-content: space-between;
            gap: 15px;
            padding: 18px 0;
            border-bottom: 1px solid #eee;
        }


        .cart-item-info {
            flex: 1;
        }


        .cart-item-info h3 {
            margin: 0 0 6px;
            font-size: 16px;
        }


        .cart-item-info p {
            margin: 0;
            color: #777;
            font-size: 13px;
        }


        .cart-item-right {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 8px;
        }


        .cart-quantity {
            display: flex;
            align-items: center;
            gap: 8px;
        }


        .cart-quantity button {
            width: 28px;
            height: 28px;
            border: none;
            border-radius: 7px;
            background: #145c32;
            color: white;
            font-size: 18px;
            cursor: pointer;
        }


        .cart-quantity span {
            min-width: 18px;
            text-align: center;
            font-weight: bold;
        }


        .cart-remove {
            border: none;
            background: transparent;
            color: #d33;
            cursor: pointer;
            font-size: 12px;
        }


        /* =====================================
           EMPTY CART
        ===================================== */

        .empty-cart {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: #666;
        }


        .empty-cart-icon {
            font-size: 60px;
            margin-bottom: 15px;
        }


        .empty-cart h3 {
            margin: 0 0 8px;
            color: #222;
        }


        .empty-cart p {
            margin: 0;
        }


        /* =====================================
           CART FOOTER
        ===================================== */

        .cart-footer {
            padding: 20px;
            border-top: 1px solid #eee;
            background: white;
        }


        .bill-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            color: #555;
        }


        .total-row {
            padding-top: 12px;
            border-top: 1px solid #eee;
            font-size: 19px;
            color: #111;
        }


        #checkoutButton {
            width: 100%;
            padding: 15px;
            margin-top: 10px;
            border: none;
            border-radius: 10px;
            background: #145c32;
            color: white;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
        }


        #checkoutButton:hover {
            opacity: 0.9;
        }


        /* =====================================
           TOAST
        ===================================== */

        #furzoToast {
            position: fixed;
            left: 50%;
            bottom: 30px;
            transform: translate(-50%, 20px);
            background: #222;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            opacity: 0;
            pointer-events: none;
            transition: all 0.25s ease;
            z-index: 10000;
        }


        #furzoToast.show {
            opacity: 1;
            transform: translate(-50%, 0);
        }


        /* =====================================
           MOBILE
        ===================================== */

        @media (max-width: 600px) {

            .cart-panel {
                width: 100%;
            }

            .cart-item {
                gap: 10px;
            }

        }

    `;


    document.head.appendChild(style);


    // ------------------------------------------
    // INITIALIZE
    // ------------------------------------------

    updateCartCount();

    updateAllProducts();

});