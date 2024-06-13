let categories = [
    { image: "Chocolatecake.jpg", category: "Kuchen" },
    { image: "CinnamonRoll.jpg", category: "Kleingebäck" },
    { image: "Muffin.jpg", category: "Muffins" },
    { image: "Torte.jpg", category: "Torten" },
    { image: "Coffee.jpg", category: "Getränke" },
];

let cards = [
    { category: "Kuchen", type: "Erdbeerkuchen", description: "mit frischen Erdbeeren und Sahne, je Stück", price: 3.40 },
    { category: "Kuchen", type: "Apfelkuchen", description: "mit Streuseln und Mandeln, je Stück", price: 3.20 },
    { category: "Kuchen", type: "Schokoladenkuchen", description: "mit knackigen Schokostückchen", price: 3.30 },

    { category: "Torten", type: "Sachertorte", description: "mit Marillenmarmelade und Schokoglasur", price: 4.20 },
    { category: "Torten", type: "Käsesahnetorte", description: "mit fruchtigen Pfirsichstückchen", price: 4.00 },
    { category: "Torten", type: "Wiener Nusstorte", description: "mit knackigen Walnüssen", price: 4.50 },

    { category: "Muffins", type: "Blaubeer-Muffin", description: "mit frischen Blaubeeren", price: 2.20 },
    { category: "Muffins", type: "Apfel-Vanille-Muffin", description: "mit leckeren Apfelstückchen", price: 2.50 },
    { category: "Muffins", type: "Schoko-Muffin", description: "mit reichlich Schokolade", price: 2.30 },

    { category: "Kleingebäck", type: "Zimtschnecke", description: "mit einer aromatischen Zimtfüllung", price: 2.60 },
    { category: "Kleingebäck", type: "Donut", description: "klassisch mit Zimt und Zucker", price: 2.00 },
    { category: "Kleingebäck", type: "Cremehörnchen", description: "gefüllt mit leckerer Vanillecreme", price: 2.80 },

    { category: "Getränke", type: "Cappucino", description: "Espresso mit heißem Milchschaum", price: 2.10 },
    { category: "Getränke", type: "Kaffee", description: "Arabica", price: 1.90 },
    { category: "Getränke", type: "Grüntee", description: "Nepal Himalaya View", price: 2.30 },
    { category: "Getränke", type: "Stilles Wasser", description: "Gerolsteiner 0,5l", price: 1.40 },
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
}

function renderCategoryHeader(category, image) {
    return `
    <div id=${category} class="category-header">
        <img src="./img/${image}" alt="${category}" class="category-image">
        <h3 class="category-title">${category}</h3>
    </div>
    `;
}

function singleCard(card, i) {
    return `
    <div class="card">
        <div class="inner-card" onclick="addToCart(${i})">        
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
    let price = cart[0].price[i];

    if (cart[0].quantity[i] > 1) {
        cart[0].quantity[i]--;
        cart[0].totalPerItem[i] = cart[0].quantity[i] * price;
    } else {
        cart[0].type.splice(i, 1);
        cart[0].price.splice(i, 1);
        cart[0].quantity.splice(i, 1);
        cart[0].totalPerItem.splice(i, 1);
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

function addToCartFromCart(i) {
    let type = cart[0].type[i];
    let index = cards.findIndex(card => card.type === type);

    if (index !== -1) {
        addToCart(index);
    }
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

window.onscroll = function () {
    const right = document.querySelector('.right');
    if (window.scrollY > 0) {
        right.style.top = "0px";
    } else {
        right.style.top = "100px";
    }
}


/* Klick auf Schließen-Button blendet "right" aus. Resize-Event überwacht die Bildschirmbreite und zeigt
"right" wieder an, wenn die Bildschirmbreite über 1000px geht. */
document.getElementById('closeCart').addEventListener('click', function () {
    document.getElementById('right').style.display = 'none';
});

function showCart() {
    document.getElementById('right').style.display = 'block';
}

window.addEventListener('resize', function () {
    if (window.innerWidth > 1000) {
        document.getElementById('right').style.display = 'block';
    }
});


function save() {
    let cardsAsText = JSON.stringify(cards);
    let cartAsText = JSON.stringify(cart);
    localStorage.setItem('cards', cardsAsText);
    localStorage.setItem('cart', cartAsText);
}

function load() {
    let cardsAsText = localStorage.getItem('cards');
    let cartAsText = localStorage.getItem('cart');
    if (cardsAsText && cartAsText) {
        cards = JSON.parse(cardsAsText);
        cart = JSON.parse(cartAsText);
    }
}
