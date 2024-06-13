let category = [
    { "image": "Chocolatecake.jpg", "title": "Kuchen" },
    { "image": "CinnamonRoll.jpg", "title": "Kleingebäck" }
]

let cards = [
    { type: "Erdbeerkuchen", description: "mit frischen Erdbeeren und Sahne, je Stück", price: 4.50, quantity: 1 },
    { type: "Apfelkuchen", description: "mit Streuseln und Mandeln, je Stück", price: 3.80, quantity: 1 },
]

let cart = [];

// let item = [];
// let ttlPrice = [];
// let quantity = [];
// let cards = [
//     {
//         "menu": [
//             { "type": "Erdbeerkuchen", "description": "mit frischen Erdbeeren und Sahne, je Stück", "price": 4.50, },
//             { "type": "Apfelkuchen", "description": "mit Streuseln und Mandeln", "price": 3.80 },
//         ],
//     },
//     {
//         "menu": [
//             { "type": "Zimtschnecke", "description": "mit Hagelzucker, je Stück", "price": 2.60, },
//             { "type": "Cremehörnchen", "description": "gefüllt mit leckerer Vanillecreme", "price": 2.80 },
//         ],
//     },
// ]

// let cartType = [];
// let cartPrice = [];
// let cartQuantity = [];

// let cart = [
//     {
//         type: ["Erbeerkuchen", "Apfelkuchen"],
//         price: [4.50, 3.80],
//         quantity: [1, 2],
//     }
// ]

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
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
            </div>    
    </div>
    </div>    
    `
}

// function renderShoppingCart() {
//     let shoppingCart = document.getElementById("renderShoppingCart");
//     shoppingCart.innerHTML = '';
//     for (let i = 0; i < cart.length; i++) {
//         let innerCart = cart[i];
//         shoppingCart.innerHTML += cartContent(innerCart, i);
//     }
//     render();
// }

function renderShoppingCart() {
    let content = document.getElementById('renderShoppingCart');
    content.innerHTML = '';
    for (let i = 0; cartType.length; i++);
    const type = cartType[i];
    const price = cartPrice[i];
    const quantity = cartQuantity[i];
    content.innerHTML += cartContent(type, price, quantity, i)
}

function cartContent(type, price, quantity, i) {
    return `
    <div class="item">
        <div class="cart-item">
            <span>${quantity} x</span>
            <div class="item-detail">
                <div class="item-name">${type}</div>
                <div class="item-price">${price}</div>
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

function addToCart(itemArray) {
    for (let i = 0; i < itemArray.length; i++) {
        const item = itemArray[i];
        cart.push({
            type: item.type,
            price: item.price,
            quantity: item.quantity,
        });
    }

}

// function addToCart(i) {
//     let item = cards[i].type;
//     let price = cards[i].price;
//     let index = cartType.indexOf(item);

//     if (index == -1) {
//         cartType.push(item);
//         cartPrice.push(price);
//         cartQuantity.push(1);
//     } else {
//         cartQuantity[index]++;
//     }
//     renderShoppingCart();
// }

// function addToCart(i) {
//     let item = cards[i].type;
//     let price = cards[i].price;
//     let index = cart[0]['type'].indexOf(item)

//     if (index == -1) {
//         cart[0].type.push(item);
//         cart[0].price.push(price);
//         cart[0].quantity.push(1);
//     }
//     else {
//         cart[0].quantity[index]++;
//     }
//     renderShoppingCart()
// }

// function cartContent(innerCart, i) {
//     return `
//     <div class="item">
//         <div class="cart-item">
//             <span>${innerCart["quantity"]} x</span>
//             <div class="item-detail">
//                 <div class="item-name">${innerCart["type"]}</div>
//                 <div class="item-price">${innerCart["price"]}</div>
//             </div>
//         </div>
//         <div class="buttons">
//             <span class="button-bg"><img src="./img/remove.svg" alt="decrease"></span>
//             <span class="counter">1</span>
//             <span class="button-bg"><img src="./img/add.svg" alt="increase"></span>
//         </div>
//     </div>
//     <div class="separator"></div>
//     `
// }

