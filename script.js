// Data for product categories and items
const categories = [
    { id: "ice_creams", name: "ICE CREAMS", image: "assets/ice.jpeg", description: "I scream, you scream, we all scream for ice cream!" },
    { id: "cakes", name: "CAKES", image: "assets/CAKE2.jpg", description: "Birthdays are nature's way of telling us to eat more cake." },
    { id: "chocolates", name: "CHOCOLATE", image: "assets/chocalate.jpeg", description: "Life without chocolate is just like a day without sunrise." },
    { id: "juices", name: "JUICE", image: "assets/JUICE.jpeg", description: "Juice It Up is your healthy, convenient alternative to fast food." }
];

const products = {
    ice_creams: [
        { id: "vanilla", name: "Vanilla Ice Cream", price: 120, image: "assets/vennila.jpeg" },
        { id: "strawberry", name: "Strawberry", price: 140, image: "assets/sta2.jpeg" },
        { id: "black_currant", name: "Black Currant", price: 170, image: "assets/black2.jpeg" },
        { id: "butterscotch_ice", name: "Butterscotch", price: 210, image: "assets/butter2.jpeg" }
    ],
    cakes: [
        { id: "chocolate_cake", name: "CHOCOLATE CAKE", price: 200, image: "assets/CAKE.jpeg" },
        { id: "strawberry_cake", name: "STRAWBERRY CAKE", price: 340, image: "assets/CAKE6.jpeg" },
        { id: "vanilla_cake", name: "VANILLA CAKE", price: 270, image: "assets/CAKE4.jpeg" },
        { id: "butterscotch_cake", name: "BUTTERSCOTCH", price: 300, image: "assets/CAKE7.jpeg" }
    ],
    chocolates: [
        { id: "dairy_milk", name: "DAIRY MILK", price: 120, image: "assets/MILK1.jpeg" },
        { id: "kit_kat", name: "KIT KAT", price: 140, image: "assets/MILK2.jpeg" },
        { id: "snickers", name: "SNICKERS", price: 170, image: "assets/MILK3.jpeg" },
        { id: "milky_bar", name: "MILKY BAR", price: 210, image: "assets/MILK4.jpeg" }
    ],
    juices: [
        { id: "lemon_juice", name: "LEMON", price: 120, image: "assets/JUICE2.jpeg" },
        { id: "orange_juice", name: "ORANGE", price: 140, image: "assets/JUICE3.jpeg" },
        { id: "apple_juice", name: "APPLE JUICE", price: 170, image: "assets/JUICE1.jpeg" },
        { id: "mango_juice", name: "MANGO", price: 210, image: "assets/JUICE4.jpeg" }
    ]
};

let currentCategory = ''; // To keep track of which product list is currently displayed

// --- DOM Elements ---
const homePageSection = document.getElementById('homePageSection');
const productListSection = document.getElementById('productListSection');
const cartSection = document.getElementById('cartSection');
const orderHistorySection = document.getElementById('orderHistorySection'); // NEW
const productCategoriesContainer = document.getElementById('productCategories');
const productItemsContainer = document.getElementById('productItemsContainer');
const productListTitle = document.getElementById('productListTitle');
const productListControls = document.getElementById('productListControls');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalDisplay = document.getElementById('cart-total');
const ordersContainer = document.getElementById('ordersContainer'); // NEW
const orderModal = document.getElementById('orderModal');
const modalOrderDetails = document.getElementById('order-summary-list');
const modalGrandTotal = document.getElementById('modal-grand-total');
const confirmBtn = document.getElementById('confirmBtn');
const cancelBtn = document.getElementById('cancelBtn');
const orderSuccessOverlay = document.getElementById('orderSuccessOverlay');
const displayOrderId = document.getElementById('displayOrderId');
const displayTotalAmount = document.getElementById('displayTotalAmount');
const backHomeBtn = document.getElementById('backHomeBtn');

// --- Initial Page Load ---
document.addEventListener('DOMContentLoaded', () => {
    renderProductCategories();
    showCategorySection(); // Start on the category page
});

// --- Navigation Functions ---
function showCategorySection() {
    homePageSection.style.display = 'block';
    productListSection.style.display = 'none';
    cartSection.style.display = 'none';
    orderHistorySection.style.display = 'none'; // NEW
    orderModal.style.display = 'none';
    orderSuccessOverlay.style.display = 'none';
}

function showProductListSection(categoryId) {
    currentCategory = categoryId;
    homePageSection.style.display = 'none';
    productListSection.style.display = 'block';
    cartSection.style.display = 'none';
    orderHistorySection.style.display = 'none'; // NEW
    orderModal.style.display = 'none';
    orderSuccessOverlay.style.display = 'none';
    renderProductList(categoryId);
}

function showCartSection() {
    homePageSection.style.display = 'none';
    productListSection.style.display = 'none';
    cartSection.style.display = 'block';
    orderHistorySection.style.display = 'none'; // NEW
    orderModal.style.display = 'none';
    orderSuccessOverlay.style.display = 'none';
    loadCart(); // Load cart items when navigating to cart
}

// NEW: Show Order History Section
async function showOrderHistorySection() {
    homePageSection.style.display = 'none';
    productListSection.style.display = 'none';
    cartSection.style.display = 'none';
    orderHistorySection.style.display = 'block'; // NEW
    orderModal.style.display = 'none';
    orderSuccessOverlay.style.display = 'none';
    await fetchAndRenderOrders(); // Fetch and display orders
}


// --- Render Functions ---
function renderProductCategories() {
    productCategoriesContainer.innerHTML = ''; // Clear existing
    categories.forEach(category => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${category.image}" alt="${category.name}"/>
            <div class="card-body">
                <div class="card-title">${category.name}</div>
                <div class="card-text">${category.description}</div>
                <a href="#" class="card-button" onclick="showProductListSection('${category.id}');">PURCHASE</a>
            </div>
        `;
        productCategoriesContainer.appendChild(card);
    });
}

function renderProductList(categoryId) {
    const categoryProducts = products[categoryId];
    const categoryInfo = categories.find(cat => cat.id === categoryId);

    productListTitle.textContent = `${categoryInfo.name.toUpperCase()} LIST`;
    productItemsContainer.innerHTML = ''; // Clear existing product cards

    categoryProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}"/>
            <div class="card-body">
                <div class="card-title">${product.name}</div>
                <div class="price-text">PRICE: ₹${product.price}</div>
                <label>Qty:</label>
                <input id="qty-${product.id}" type="number" min="0" value="0" onchange="updateProductItemTotal('${product.id}', ${product.price})"/>
                <p>Total: ₹<span id="total-${product.id}">0</span></p>
                <button onclick="addToCart('${product.id}', '${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
            </div>
        `;
        productItemsContainer.appendChild(card);
    });

    productListControls.innerHTML = `
        <div class="total-summary" id="currentProductListSummary" style="margin-top: 20px; text-align: center;">
            Total Price: ₹0<br/>
            Selected Items: None
        </div>
        <div style="text-align: center; margin-top: 30px;">
            <button onclick="openOrderModalFromProductList()">BUY SELECTED</button>
            <br/><br/>
            <a class="card-button" href="#" onclick="showCategorySection()">Back to Categories</a>
        </div>
    `;
    updateProductListSummary(); // Initialize the summary
}

// --- Product List Specific Functions ---
function updateProductItemTotal(productId, price) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    const totalSpan = document.getElementById(`total-${productId}`);
    const qty = parseInt(qtyInput.value) || 0;
    const total = qty * price;
    totalSpan.textContent = total;
    updateProductListSummary(); // Update the overall summary for the current product list
}

function updateProductListSummary() {
    let grandTotal = 0;
    let selectedItems = [];
    const currentProductList = products[currentCategory];

    if (currentProductList) {
        currentProductList.forEach(product => {
            const qtyInput = document.getElementById(`qty-${product.id}`);
            const qty = parseInt(qtyInput.value) || 0;
            if (qty > 0) {
                selectedItems.push(`${product.name} x${qty}`);
                grandTotal += qty * product.price;
            }
        });
    }

    const summaryElement = document.getElementById("currentProductListSummary");
    if (summaryElement) {
        summaryElement.innerHTML = `
            Total Price: ₹${grandTotal}<br>
            Selected Items: ${selectedItems.length ? selectedItems.join(", ") : "None"}
        `;
    }
}

function addToCart(productId, productName, productPrice, productImage) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    const qty = parseInt(qtyInput.value) || 0;

    if (qty <= 0) {
        alert("Please enter a quantity greater than 0 to add to cart.");
        return;
    }

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItemIndex = cartItems.findIndex(item => item.id === productId && item.category === currentCategory);

    if (existingItemIndex > -1) {
        cartItems[existingItemIndex].qty += qty;
        cartItems[existingItemIndex].total = cartItems[existingItemIndex].qty * productPrice;
    } else {
        cartItems.push({
            id: productId,
            category: currentCategory,
            name: productName,
            price: productPrice,
            qty: qty,
            total: qty * productPrice,
            image: productImage
        });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    alert(`${qty} x ${productName} added to cart!`);
    qtyInput.value = 0; // Reset quantity after adding to cart
    updateProductItemTotal(productId, productPrice); // Update displayed total for that item
}

// --- Cart Functions ---
function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItemsContainer.innerHTML = ""; // Clear existing

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = "<p style='text-align:center; font-size:18px;'>Your cart is empty.</p>";
        cartTotalDisplay.textContent = "Total: ₹0";
        return;
    }

    let grandTotal = 0;
    cartItems.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 100px; object-fit: cover; margin-right: 15px;">
            <div class="card-body">
                <div class="card-title">${item.name}</div>
                <div class="card-text">Quantity: ${item.qty}</div>
                <div class="card-text">Price per item: ₹${item.price}</div>
                <div class="card-text">Subtotal: ₹${item.total}</div>
                <button onclick="removeFromCart('${item.id}', '${item.category}')">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(card);
        grandTotal += item.total;
    });

    cartTotalDisplay.textContent = `Total: ₹${grandTotal}`;
}

function removeFromCart(productId, categoryId) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems = cartItems.filter(item => !(item.id === productId && item.category === categoryId));
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    loadCart(); // Reload cart to update display
}

function clearCart() {
    if (confirm("Are you sure you want to clear the cart?")) {
        localStorage.removeItem("cartItems");
        loadCart();
    }
}

// --- Order Modal and Success Overlay Functions ---
function openOrderModalFromProductList() {
    const selectedItems = [];
    let grandTotal = 0;
    const currentProductList = products[currentCategory];

    if (currentProductList) {
        currentProductList.forEach(product => {
            const qtyInput = document.getElementById(`qty-${product.id}`);
            const qty = parseInt(qtyInput.value) || 0;
            if (qty > 0) {
                selectedItems.push({
                    id: product.id,
                    name: product.name,
                    qty: qty,
                    price: product.price,
                    total: qty * product.price,
                    category: currentCategory,
                    image: product.image
                });
                grandTotal += qty * product.price;
            }
        });
    }

    if (selectedItems.length === 0) {
        alert("Please select at least one item to buy.");
        return;
    }

    renderModalContent(selectedItems, grandTotal);
    orderModal.style.display = 'flex'; // Show modal

    confirmBtn.onclick = () => confirmOrder(selectedItems, grandTotal);
    cancelBtn.onclick = () => closeModal();
}

function checkout() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (cartItems.length === 0) {
        alert("Your cart is empty. Please add items before checking out.");
        return;
    }

    let grandTotal = 0;
    cartItems.forEach(item => {
        grandTotal += item.total;
    });

    renderModalContent(cartItems, grandTotal);
    orderModal.style.display = 'flex'; // Show modal

    confirmBtn.onclick = () => confirmOrder(cartItems, grandTotal, true);
    cancelBtn.onclick = () => closeModal();
}

function renderModalContent(items, totalAmount) {
    modalOrderDetails.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} x ${item.qty} = ₹${item.total}`;
        modalOrderDetails.appendChild(li);
    });
    modalGrandTotal.textContent = `₹${totalAmount}`;
}

function closeModal() {
    orderModal.style.display = 'none';
}

async function confirmOrder(itemsToOrder, grandTotal, fromCart = false) {
    closeModal();

    const orderData = {
        cartItems: itemsToOrder,
        grandTotal: grandTotal
    };

    try {
        const response = await fetch('/api/submit-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Order successfully submitted to DB:", data);
            
            const orderId = data.orderId || ('DJ' + Date.now().toString().slice(-6));

            orderSuccessOverlay.style.display = 'flex';
            displayOrderId.textContent = orderId;
            displayTotalAmount.textContent = `₹${grandTotal}`;

            if (!fromCart) {
                const currentProductList = products[currentCategory];
                if (currentProductList) {
                    currentProductList.forEach(product => {
                        const qtyInput = document.getElementById(`qty-${product.id}`);
                        if (qtyInput) {
                            qtyInput.value = 0;
                            updateProductItemTotal(product.id, product.price);
                        }
                    });
                }
            } else {
                clearCart();
            }
        } else {
            console.error("Error submitting order:", data.message || "Unknown error");
            alert("Failed to submit order: " + (data.message || "Please try again."));
            if (!fromCart) {
                showProductListSection(currentCategory);
            } else {
                showCartSection();
            }
        }
    } catch (error) {
        console.error("Network error or server error:", error);
        alert("An error occurred while submitting your order. Please check your network or server.");
        if (!fromCart) {
            showProductListSection(currentCategory);
        } else {
            showCartSection();
        }
    }
}

backHomeBtn.onclick = () => {
    orderSuccessOverlay.style.display = 'none';
    showCategorySection();
};

// NEW: Function to fetch and render all orders
async function fetchAndRenderOrders() {
    ordersContainer.innerHTML = '<p style="text-align:center; font-size:18px;">Loading orders...</p>'; // Show loading message

    try {
        const response = await fetch('/api/orders'); // Call the new backend endpoint
        const orders = await response.json();

        ordersContainer.innerHTML = ''; // Clear loading message

        if (response.ok) {
            if (orders.length === 0) {
                ordersContainer.innerHTML = '<p style="text-align:center; font-size:18px;">No orders found yet.</p>';
            } else {
                orders.forEach(order => {
                    const orderCard = document.createElement('div');
                    orderCard.className = 'card order-card'; // Add a new class for specific styling
                    
                    let itemsHtml = '';
                    order.items.forEach(item => {
                        itemsHtml += `
                            <div class="order-item">
                                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                                <span>${item.name} x ${item.qty} (₹${item.price}/ea)</span>
                                <span>Subtotal: ₹${item.total}</span>
                            </div>
                        `;
                    });

                    orderCard.innerHTML = `
                        <div class="card-body">
                            <div class="card-title">Order ID: ${order._id}</div>
                            <p>Date: ${new Date(order.order_date).toLocaleString()}</p>
                            <p>Status: <span class="order-status ${order.status}">${order.status.toUpperCase()}</span></p>
                            <hr/>
                            <h4>Items:</h4>
                            <div class="order-items-list">${itemsHtml}</div>
                            <hr/>
                            <h3>Total: ₹${order.total_amount}</h3>
                        </div>
                    `;
                    ordersContainer.appendChild(orderCard);
                });
            }
        } else {
            ordersContainer.innerHTML = `<p style="text-align:center; font-size:18px; color: red;">Error fetching orders: ${orders.message || 'Unknown error'}</p>`;
        }
    } catch (error) {
        console.error("Network error fetching orders:", error);
        ordersContainer.innerHTML = '<p style="text-align:center; font-size:18px; color: red;">Network error. Could not load orders.</p>';
    }
}