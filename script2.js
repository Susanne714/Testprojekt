let postings = [
    {
        "profileImage": ['1.jpg'],
        "author": "Joy",
        "location": "Tooltown",
        "postImage": ['5.jpg'],
        "likesHeart": "2",
        "likeCounter": "2",
        "comments": [
            { 'user': 'Jim', 'comment': 'Brilliant!' },
            { 'user': 'John', 'comment': 'This is awesome!' },
        ],
    }
]


function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    for (let i = 0; i < postings.length; i++) {
        const post = postings[i];
        content.innerHTML += generatePost(post, i)
    }

    let userComments = document.getElementById(`comments${i}`);
    for (let j = 0; j < post['comments'].length; j++) {
        const defaultComments = post['comments'][j];
        userComments.innerHTML += `<div><span><b>${defaultComments['user']}</b>${defaultComments['comment']}</span></div>`

    }
}

function generatePost(post, index) {
    return
    /*html*/
    `<div>
    <div>
<img src="./img/${post['profileImage']}" alt="" class="profile_image">
<div>
<h3>${post['author']}</h3>
<span>${post['location']}</span>
</div>
</div>
</div>

<div><img src="./img/${post['postImage']}" alt="" class="posted-image"></div>  
`
}