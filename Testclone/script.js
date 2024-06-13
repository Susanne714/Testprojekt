const heartIcon = document.querySelector('.like-button .heart-icon');
const likesAmountLabel = document.querySelector('.like-button .likes-amount');

let likesAmount = 7;

heartIcon.addEventListener('click', () => {
    heartIcon.classList.toggle('liked');
    if (heartIcon.classList.contains('liked')) {
        likesAmount++;
    } else {
        likesAmount--;
    }

    likesAmountLabel.innerHTML = likesAmount;

})



function toggle() {
    let btn = document.getElementById('btn');
    if (btn.classList.contains("far")) {
        btn.classList.remove("far");
        btn.classList.add("fas");
    } else {
        btn.classList.remove("fas");
        btn.classList.add("far");
    }
}