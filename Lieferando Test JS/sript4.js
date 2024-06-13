let items = [];
let ttlQty = [];

let cards = [
    {
        type: "Erdbeerkuchen",
        description: "mit frischen Erdbeeren und Sahne, je Stück",
        price: 4.50,
        singleQty: 1,
    }
]

function render() {
    let content = document.getElementById("content");
    content.innerHTML = "";
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        content.innerHTML += singleCard(card);


    }
}

function singleCard(card) {
    return `
    <div class="card">
        <div class="inner-card">        
            <div class="info-section" id="infoSection">
                <div class="menu-title"><b>${card["type"]}</b></div>
                <span>${card["description"]}</span>
                <div class="price"><b>${card["price"].toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</b></div>              
            </div>     
            <div class="add-button" onclick="">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
            </div>    
    </div>
    </div>    
    `
}

