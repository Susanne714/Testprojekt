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

}

function init() {
    includeHTML();
    listingRecept();
}

let number = [500, 250, 2, 2, 1, 1, 1, 1, 1, 50];
let text = ['g Rinderhackfleisch', 'g Lammhackfleisch', 'mittelgroße Zwiebeln', 'Knoblauchzehe(n)', 'TL Paprikapulver', 'TL Kreuzkümmel', 'TL Salz', 'TL Pfeffer', 'TL Backpulver', 'ml Wasser'];
let calcPerson = [];


// Zutaten werden aufgelistet. Standartwert 4 als Placeholder eingegeben
function listingRecept() {
    for (let i = 0; i < number.length; i++) {
        if (i % 2 == 0) {
            document.getElementById('ingredients').innerHTML += `<div class='ingredients-container-lg'>${number[i]} ${text[i]}</div>`;
        } else {
            document.getElementById('ingredients').innerHTML += `<div class='ingredients-container-w'>${number[i]} ${text[i]}</div>`;
        }
    }
}


// Personenzahl wird ermittelt, neues Array wird für die Menge erstellt.
function calculateRecept() {
    let rPerson = +document.getElementById('input-id').value;

    if (rPerson < 1 || rPerson > 15) {
        alert('mindestens 1 und maximal 15 eingeben');
    } else {
        for (let i = 0; i < number.length; i++) {
            let result = number[i] / 4 * rPerson;

            calcPerson[i] = result;
        }
    }
    showCalcRecept(rPerson);
}


// Neues Array mit den angegeben Portionen wird eingefügt. Bei einer Eingabe von 4 passiert nichts
function showCalcRecept(rPerson) {
    document.getElementById('ingredients').innerHTML = ``;

    for (let i = 0; i < calcPerson.length; i++) {
        if (i % 2 == 0) {
            document.getElementById('ingredients').innerHTML += `<div class='ingredients-container-lg'>${calcPerson[i]} ${text[i]}</div>`;
        } else {
            document.getElementById('ingredients').innerHTML += `<div class='ingredients-container-w'>${calcPerson[i]} ${text[i]}</div>`;
        }
    }
}

function showNavbar() {
    document.getElementById('navbar').classList.add('show-overlay-menu');
}

function closeNavbar() {
    document.getElementById('navbar').classList.remove('show-overlay-menu');
}