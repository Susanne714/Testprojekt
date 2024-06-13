let category = [
    { "image": "Chocolatecake.jpg", "title": "Kuchen" },
    { "image": "CinnamonRoll.jpg", "title": "Kleingebäck" }
]

let cards = [
    { type: "Erdbeerkuchen", description: "mit frischen Erdbeeren und Sahne, je Stück", price: 4.50, },
    { type: "Apfelkuchen", description: "mit Streuseln und Mandeln, je Stück", price: 3.80, },
    { type: "Schokoladenkuchen", description: "mit knackigen Schokostückchen", price: 4.00, },
]


let cart = [
    {
        type: [],
        price: [],
        quantity: [],
        totalPerItem: [],
    }
]

let deliveryOption = 'Pickup';
const deliveryCost = 5.00;

function render() {
    let content = document.getElementById("content");
    content.innerHTML = "";
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        content.innerHTML += singleCard(card, i);
    }
}

function singleCard(card, i) {
    return `
    <!-- <div id="categoryImg${i}" class="category-img-box"></div> -->
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
    `
}

function renderSubTotal() {
    let subTotal = cart[0].totalPerItem.reduce((acc, curr) => acc + curr, 0);
    if (subTotal < minValue) {
        alert("Zu wenig")
    } else {
        return `
    <div class="sub-total">
        <div>Zwischensumme:</div><div>${subTotal.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</div>
    </div>
    `;
    }
}

// function updateDeliveryOption(option) {
//     deliveryOption = option;
//     const deliveryButton = document.getElementById("deliveryButton");
//     const pickupButton = document.getElementById("pickupButton");

//     deliveryButton.classList.remove("active", "inactive");
//     pickupButton.classList.remove("active", "inactive");

//     if (option === 'Delivery') {
//         deliveryButton.classList.add("active");
//         pickupButton.classList.add("inactive");
//     } else {
//         pickupButton.classList.add("active");
//         deliveryButton.classList.add("inactive");
//     }
//     renderShoppingCart();
// }

document.addEventListener("DOMContentLoaded", function () {
    const deliveryOption = document.getElementById("delivery");
    const pickupOption = document.getElementById("pickup");
    const sliderThumb = document.getElementById("slider-thumb");

    deliveryOption.addEventListener("click", function () {
        sliderThumb.style.left = "0";
        deliveryOption.classList.add("active");
        pickupOption.classList.remove("active");
        deliveryOption = 'Delivery';
        renderShoppingCart();
    });

    pickupOption.addEventListener("click", function () {
        sliderThumb.style.left = "50%";
        pickupOption.classList.add("active");
        deliveryOption.classList.remove("active");
        deliveryOption = 'Pickup';
        renderShoppingCart();
    });

    // Set initial state
    pickupOption.classList.add("active");
    sliderThumb.style.left = "50%";
    renderShoppingCart();
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
    render();
}

function renderSubTotal() {
    let subTotal = cart[0].totalPerItem.reduce((acc, curr) => acc + curr, 0);
    return `
    <div class="sub-total">
    <b>Zwischensumme: ${subTotal.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</b>
    </div>
    `
}

function renderDeliveryCost() {
    return `
    <div class="delivery-cost">
    <b>Lieferkosten: ${deliveryCost.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}
    `
}

function renderTotalCost() {
    let subTotal = cart[0].totalPerItem.reduce((acc, curr) => acc + curr, 0);
    let totalCost = subTotal;
    if (deliveryOption === 'Delivery') {
        totalCost += deliveryCost;
    }
    return `
    <div class="total-cost">
        <b>Gesamt ${totalCost.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</b>
    </div>
    `
}

function addToCart(i) {
    let item = cards[i].type;
    let price = cards[i].price;
    let index = cart[0].type.indexOf(item)

    if (index == -1) {
        cart[0].type.push(item);
        cart[0].price.push(price);
        cart[0].quantity.push(1);
        cart[0].totalPerItem.push(price);
    }
    else {
        cart[0].quantity[index]++;
        cart[0].totalPerItem[index] = cart[0].quantity[index] * price;
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
            <span class="button-bg"><img src="./img/remove.svg" alt="decrease"></span>
            <span class="counter">1</span>
            <span class="button-bg"><img src="./img/add.svg" alt="increase"></span>
        </div>
    </div>
    <div class="separator"></div>
    `
}




