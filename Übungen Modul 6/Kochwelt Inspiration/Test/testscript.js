async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }

    window.onload = function() {
        document.getElementById('amount').value = '';
        }
}

// function showSidebar(){
//     const sidebar=document.querySelector('.sidebar')
//     sidebar.style.display='flex'
// }

// function hideSidebar(){
//     const sidebar=document.querySelector('.sidebar')
//     sidebar.style.display='none'
// }



// function calculateR1(){   
//     let demand= +document.getElementById('amount').value;
//     let basic= [1,1,0.5,0.5,200,0.5,0.5,1,37.5,0.25,25,50,0.25];

//     let input= +document.getElementById('amount').value;
//     if ((input<1) || (input>20)){
//         alert ('Bitte zwischen 1 und 20 Portionen angeben');        
//     }
    

//     document.getElementById('ingredients').innerHTML =`
    
//     <span class="ingredients-grey-row">${demand*basic[0]} Hähnchenschenkel</span>
//     <span class="ingredients-white-row">${demand*basic[1]} EL Olivenöl</span>
//     <span class="ingredients-grey-row">${demand*basic[2]} rote Zwiebeln</span>
//     <span class="ingredients-white-row">${demand*basic[3]} kleine Knoblauchzehe(n)</span>
//     <span class="ingredients-grey-row">${demand*basic[4]} Kartoffeln</span>
//     <span class="ingredients-white-row">${demand*basic[5]} Zucchini</span>
//     <span class="ingredients-white-row">${demand*basic[6]} Paprikaschote(n), rot</span>
//     <span class="ingredients-grey-row">${demand*basic[7]} Möhre(n)</span>
//     <span class="ingredients-white-row">${demand*basic[8]} g Kirschtomaten</span>
//     <span class="ingredients-grey-row">${demand*basic[9]} Zitronen, bio</span>
//     <span class="ingredients-white-row">${demand*basic[10]} ml Weißwein</span>
//     <span class="ingredients-grey-row">${demand*basic[11]} ml Gemüsebrühe</span>
//     <span class="ingredients-white-row">${demand*basic[12]} TL Paprikapulver</span>       
    
//     `
// }

// function calculateR2(){
//     let demand= +document.getElementById('amount').value;
//     let basic= [0.5,1,125,75];

//     let input= +document.getElementById('amount').value;
//     if ((input<1) || (input>20)){
//         alert ('Bitte zwischen 1 und 20 Portionen angeben');        
//     }
    

//     document.getElementById('ingredients').innerHTML =`

//     <span class="ingredients-grey-row">${demand*basic[0]} Mango</span>
//     <span class="ingredients-white-row">${demand*basic[1]} EL Zitronensaft</span>
//     <span class="ingredients-grey-row">${demand*basic[2]} g Naturjoghurt</span>
//     <span class="ingredients-white-row">${demand*basic[3]} Milch</span>          
    
//     `
// }

let einkaufsliste = [' Chips', ' Schokolade', ' Gummibärchen', ' Erdbeerkuchen'];
let menge = [3, 2, 2, 4]



function showEinkaufsliste(){
    for (let i = 0; i < menge.length; i++) {
        document.getElementById('zutaten').innerHTML += `<div>${menge[i]} ${einkaufsliste[i]}</div>`;
    }

    calculateList1(result)

}

function calculateList1(result){
    let counter= +document.getElementById('counter').value;
    if ((counter<1) || (counter>20)){
        alert ('Bitte nicht so verfressen sein!');        
    }

    for (let i = 0; i < result.length; i++) {
        document.getElementById('zutaten').innerHTML += `<div>${counter*menge[i]} ${einkaufsliste[i]}</div>`;
    }
}



    // document.getElementById('zutaten').innerHTML +=`<div>${counter*menge[i]} ${einkaufsliste[i]}</div>`
// }



// function findItems() {
//     for(let i = 0; i < menge.length; i++){
//         document.getElementById('zutaten').innerHTML +=`<div>${menge[i]} ${einkaufsliste[i]}</div>`;
//     }
    

//     for (let i = 0; i < einkaufsliste.length; i++) {
//     document.getElementById('zutaten').innerHTML += `<li>${einkaufsliste[i]}</li>`;

// }

// }

// function showEinkaufsliste(){
//         // for(let i = 0; i < findItems.length; i++){
//         document.getElementById('zutaten').innerHTML += `<div>${menge[0]} + ${einkaufsliste[0]}</div>`

    

// }

let counter= +document.getElementById('counter').value;