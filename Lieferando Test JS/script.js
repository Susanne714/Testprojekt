let categoryImages = [
    { "image": "Chocolatecake", "title": "Kuchen" },
    { "image": "CinnamonRoll", "title": "Kleingebäck" }
]

let cards = [
    {
        "menu": [
            { "type": "Erdbeerkuchen", "description": "mit frischen Erdbeeren und Sahne, je Stück", "price": 4.50, },
            { "type": "Apfelkuchen", "description": "mit Streuseln und Mandeln", "price": 3.80 },
        ],
    },
    {
        "menu": [
            { "type": "Zimtschnecke", "description": "mit Hagelzucker, je Stück", "price": 2.60, },
            { "type": "Cremehörnchen", "description": "gefüllt mit leckerer Vanillecreme", "price": 2.80 },
        ],
    },
]

let cart = [
    {
        "type": [],
        "price": [],
    }
]

function render() {
    let content = document.getElementById("content");
    content.innerHTML = "";
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        content.innerHTML += singleCard(card, i);

        for (let j = 0; j < card.menu.length; j++) {

            let type = card.menu[j].type;
            let description = card.menu[j].description;
            let price = card.menu[j].price;
            document.getElementById(`menu${i}`).innerHTML +=
                `<div class="card">
                    <div class="inner-card">
                        <div class="info-section" id="infoSection">
                            <div id="menuTitle" class="menu-title"><b>${type}</b></div>
                            <span>${description}</span>
                            <div class="price"><b>${price.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</b></div>
                        </div>             
                    <div class="add-button" onclick="addToCart(${i})"><svg class="SVG-add" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff8700"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></div>`
        }
    }
}

function singleCard(card, i) {
    return `
    <div id="menu${i}">
    <div class="category-img-box"><img src="./img/"$"{card["categoryImage"]}" alt="" class="category-img"></div>
    </div>`
}

function addToCart(i, j) {
    let item = cards[i].menu[i].type

    cart[0].type.push(item)
    // let menu = cards[x].menu[x]['type'];
    // cart.push(menu);
}

// for (let j = 0; j < category.length; j++) {
//     let image = category[j].image;
//     let title = category[j].title;
//     document.getElementById(`categoryImg${i}`).innerHTML += `
//     <img src="./img/${image}" alt="" class="category-img">`
// }

// function addToCart(i) {
//     let type = cards[i]['type'];
//     let price = cards[i]['price'];
//     let index = type.indexOf(type);

//     if (index == -1) {
//         item.push(type);
//         ttlPrice.push(price);
//         quantity.push(1);
//     }
// }