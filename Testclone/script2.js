let postings = [
    {
        "author": "Joy",
        "location": "Tooltown",
        "likesHeart": ['url(./img/heart.png)'],
        "liked": false,
        "likeCounter": 7,
    }
]

function render() {

    content.innerHTML = '';
    for (let i = 0; i < postings.length; i++) {
        let post = postings[i];
        let content = document.getElementById('content');
        content.innerHTML += singlePost(post, i)

    }
}

function singlePost(post, i) {
    return `
    <div>
<h3>${post['author']}</h3>
<span>${post['location']}</span>
</div>
</div>
</div>


<div class="like-button">
<div class="like">
<img onclick="count(${i})" src="./img/${liked(i)}" alt="">

<div class="like-button" onclick="count(${i})">
        <div class="heart-bg" id="iLike">
            <div class="heart-icon"></div>

</div>
<i>${post['likeCounter']}</i>
</div>
`
}

function count(i) {
    postings[i]["liked"] = !postings[i]["liked"];
    if (postings[i]["liked"]) {
        postings[i]["likeCounter"]++;
        document.getElementById("iLike").classList.add('like');
    } else {
        postings[i]["likeCounter"]--;
        document.getElementById("iLike").classList.remove('like');
    }

    render()
}

function liked(i) {
    if (postings[i]["liked"] == true) {
        return `liked.png`;
    } else {
        return `dolike.png`
    }
}


// function toggle(i) {
//     let btn = document.getElementById('btn');
//     if (btn.classList.contains("far")) {
//         btn.classList.remove("far");
//         btn.classList.add("fas");
//     } else {
//         btn.classList.remove("fas");
//         btn.classList.add("far");
//     }
//     count(i);
// }

const heartIcon = document.querySelector(".like-button .heart-icon");
const likesAmountLabel = document.querySelector(".like-button .likes-amount");

let likesAmount = 7;

heartIcon.addEventListener("click", () => {
    heartIcon.classList.toggle("liked");
    if (heartIcon.classList.contains("liked")) {
        likesAmount++;
    } else {
        likesAmount--;
    }

    likesAmountLabel.innerHTML = likesAmount;
})






























// let postings = [
//     {
//         "name": "A",
//         "likeCounter": 7,
//         "liked": false,
//     }
// ]

// function render() {
//     content.innerHTML = '';
//     for (let i = 0; i < postings.length; i++) {
//         let post = postings[i];
//         let content = document.getElementById('content');
//         content.innerHTML += singlePost(post, i);
//     }
// }

// function singlePost(post, i) {
//     return `
//     <div>
//     <img onclick="likePost${i}" src="${liked(i)}>
// </div>
//     `
// }
// function likePost(i) {
//     if (postings[i]["liked"]) {
//         postings[i]["likeCounter"]++;
//     } else {
//         postings[i]["likeCounter"]--;
//     }
//     render();
// }
// function liked(i) {
//     if (postings[i]["liked"] == true) {
//         return `./img/dolike.png`
//     } else {
//         return `.img/like.png`
//     }
// }