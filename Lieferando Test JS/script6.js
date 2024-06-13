let categories = [
    { image: "Chocolatecake.jpg", category: "Kuchen" },
    { image: "CinnamonRoll.jpg", category: "Kleingebäck" },
    { image: "Muffin.jpg", category: "Kleingebäck" },
    { image: "Torte.jpg", category: "Kleingebäck" },
    { image: "Coffee.jpg", category: "Kleingebäck" },

];

let cards = [
    { category: "Kuchen", type: "Erdbeerkuchen", description: "mit frischen Erdbeeren und Sahne, je Stück", price: 4.50 },
    { category: "Kuchen", type: "Apfelkuchen", description: "mit Streuseln und Mandeln, je Stück", price: 3.80 },
    { category: "Kuchen", type: "Schokoladenkuchen", description: "mit knackigen Schokostückchen", price: 4.00 },

    { category: "Torten", type: "Sachertorte", description: "mit Marillenmarmelade und Schokoglasur", price: 4.00 },

    { category: "Muffins", type: "Blaubeer-Muffin", description: "mit frischen Blaubeeren", price: 4.00 },

    { category: "Kleingebäck", type: "Zimtschnecke", description: "mit einer aromatischen Zimtfüllung", price: 4.00 },

    { category: "Getränke", type: "Cappucino", description: "Espresso mit heißem Milchschaum", price: 4.00 },
];

let cart = [
    {
        type: [],
        price: [],
        quantity: [],
        totalPerItem: []
    }
];

let deliveryOption = 'Pickup';
const deliveryCost = 5.00;
const minValue = 15.00;

function render() {
    let content = document.getElementById("content");
    content.innerHTML = "";
    let currentCategory = "";

    cards.forEach((card, i) => {
        if (currentCategory !== card.category) {
            currentCategory = card.category;
            const categoryImage = categories.find(cat => cat.category === currentCategory).image;
            content.innerHTML += renderCategoryHeader(currentCategory, categoryImage);
        }
        content.innerHTML += singleCard(card, i);
    });

    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        content.innerHTML += singleCard(card, i);
    }
}

function renderCategoryHeader(category, image) {
    return `
    <div class="category-header">
        <img src="${image}" alt="${category}" class="category-image">
        <h2 class="category-title">${category}</h2>
    </div>
    `;
}

function singleCard(card, i) {
    return `
    <div class="card">
        <div class="inner-card">        
            <div class="info-section" id="infoSection">
                <div class="menu-title"><b>${card["type"]}</b></div>
                <span>${card["description"]}</span>
                <div class="price"><b>${card["price"].toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</b></div>              
            </div>     
            <div class="add-button" onclick="addToCart(${i})">
            <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#ff8700"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
            </div>    
        </div>
    </div>    
    `;
}

document.addEventListener("DOMContentLoaded", function () {
    const deliveryElement = document.getElementById("delivery");
    const pickupElement = document.getElementById("pickup");
    const sliderThumb = document.getElementById("slider-thumb");

    deliveryElement.addEventListener("click", function () {
        sliderThumb.style.left = "0";
        deliveryElement.classList.add("active");
        pickupElement.classList.remove("active");
        deliveryOption = 'Delivery'; // Aktualisiere die Lieferoption
        renderShoppingCart(); // Warenkorb neu rendern
    });

    pickupElement.addEventListener("click", function () {
        sliderThumb.style.left = "50%";
        pickupElement.classList.add("active");
        deliveryElement.classList.remove("active");
        deliveryOption = 'Pickup'; // Aktualisiere die Lieferoption
        renderShoppingCart(); // Warenkorb neu rendern
    });

    // Initialer Zustand
    pickupElement.classList.add("active");
    sliderThumb.style.left = "50%";
    renderShoppingCart(); // Warenkorb initial rendern
});

function renderShoppingCart() {
    let shoppingCart = document.getElementById("renderShoppingCart");
    shoppingCart.innerHTML = '';
    for (let i = 0; i < cart[0].type.length; i++) {
        let type = cart[0].type[i];
        let quantity = cart[0].quantity[i];
        let totalPerItem = cart[0].totalPerItem[i];
        shoppingCart.innerHTML += cartContent(type, quantity, totalPerItem, i);
    }
    shoppingCart.innerHTML += renderSubTotal();
    if (deliveryOption === 'Delivery') {
        shoppingCart.innerHTML += renderDeliveryCost();
    }

    shoppingCart.innerHTML += renderTotalCost();
    checkMinOrderValue();
}

function renderSubTotal() {
    let subTotal = cart[0].totalPerItem.reduce((acc, curr) => acc + curr, 0);
    return `
    <div class="sub-total">
        <div>Zwischensumme:</div><div>${subTotal.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</div>
    </div>
    `;
}

function renderDeliveryCost() {
    return `
    <div class="delivery-cost">
        <div>Lieferkosten:</div><div>${deliveryCost.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</div>
    </div>
    `;
}

function renderTotalCost() {
    let subTotal = cart[0].totalPerItem.reduce((acc, curr) => acc + curr, 0);
    let totalCost = subTotal;
    if (deliveryOption === 'Delivery') {
        totalCost += deliveryCost;
    }
    return `
    <div class="total-cost">
        <div><b>Gesamt:</b></div><div><b>${totalCost.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</b></div>
    </div>
    `;
}

function addToCart(i) {
    let item = cards[i].type;
    let price = cards[i].price;
    let index = cart[0].type.indexOf(item);

    if (index === -1) {
        cart[0].type.push(item);
        cart[0].price.push(price);
        cart[0].quantity.push(1);
        cart[0].totalPerItem.push(price);
    } else {
        cart[0].quantity[index]++;
        cart[0].totalPerItem[index] = cart[0].quantity[index] * price;
    }
    renderShoppingCart();
}

function decreaseItemQty(i) {
    let item = cart[0].type[i];
    let price = cart[0].price[i];
    let index = cart[0].type.indexOf(item);

    if (index !== -1) {
        if (cart[0].quantity[index] > 1) {
            cart[0].quantity[index]--;
            cart[0].totalPerItem[index] = cart[0].quantity[index] * price;
        } else {
            cart[0].type.splice(index, 1);
            cart[0].price.splice(index, 1);
            cart[0].quantity.splice(index, 1);
            cart[0].totalPerItem.splice(index, 1);
        }
    }
    renderShoppingCart();
}

function cartContent(type, quantity, totalPerItem, i) {
    return `
    <div class="item">
        <div class="cart-item">
            <span>${quantity} x</span>
            <div class="item-detail">
                <div class="item-name">${type}</div>
                <div class="item-total">${totalPerItem.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</div>
            </div>
        </div>
        <div class="buttons">
            <span class="button-bg" onclick="decreaseItemQty(${i})"><img src="./img/remove.svg" alt="decrease"></span>
            <span class="counter">${quantity}</span>
            <span class="button-bg" onclick="addToCart(${i})"><img src="./img/add.svg" alt="increase"></span>
        </div>
    </div>
    <div class="separator"></div>
    `;
}

function checkMinOrderValue() {
    let subTotal = cart[0].totalPerItem.reduce((acc, curr) => acc + curr, 0);
    let alertElement = document.getElementById("alert");
    let orderButton = document.getElementById("orderButton");

    if (subTotal < minValue) {
        let difference = minValue - subTotal;
        alertElement.innerHTML = `Bitte füge Artikel im Wert von ${difference.toLocaleString("de-DE", { style: "currency", currency: "EUR" })} hinzu,<br> um den Mindestbestellwert zu erreichen.`;
        alertElement.style.display = "block";
        orderButton.disabled = true;
        orderButton.classList.remove("active");
    } else {
        alertElement.style.display = "none";
        orderButton.disabled = false;
        orderButton.classList.add("active");
    }
}

function order() {
    let orderDialog = document.getElementById("orderDialog");
    let orderButton = document.getElementById("orderButton");
    let overlay = document.getElementById("overlay");
    if (!orderButton.disabled) {
        orderDialog.style.display = "flex";
        overlay.style.display = "block";
    }
}

function closeOrderDialog() {
    let orderDialog = document.getElementById("orderDialog");
    let overlay = document.getElementById("overlay")
    orderDialog.style.display = "none";
    overlay.style.display = "none";

    cart[0].type = [];
    cart[0].price = [];
    cart[0].quantity = [];
    cart[0].totalPerItem = [];

    renderShoppingCart();
}
