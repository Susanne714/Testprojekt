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
        // "commentBy": ['Jim'],
        // "comments": ['Hurra'],
    }
]

function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    for (let i = 0; i < postings.length; i++) {
        const post = postings[i];
        content.innerHTML +=
            `<div class="post">
        <div class="post-header">
        <img src="./img/${post['profileImage']}" alt="" class="profile_image">
        <div class="author">
        <h3>${post['author']}</h3>
        <span>${post['location']}</span>
        </div>
        </div>

        <div><img src="./img/${post['postImage']}" alt="" class="posted-image"></div>

        <div class="posted-comments">
        <div><b>${post['comments']}</b></div>
        <div id="postcontent${i}"></div>        
        </div>

        <div id="inputfield" class="add-comment">
        <div>
        <input placeholder="Enter your name" id="input${i}">
        </div>
        <span class="usertext" role="textbox" contenteditable="true" id="inputText">${post['comments']}</span>
        <button onclick="addComment(${i})">comment</button>  
        `;

        let postcontent = document.getElementById(`postcontent${i}`);

        for (let j = 0; j < post['comments'].length; j++) {
            const comment = post['comments'][j];

            postcontent.innerHTML +=
                `<div>${comment[j].user}</div>
            <div>${comment}</div>`
        }

    }
}

function addComment(index) {
    let input = document.getElementById(`input${index}`);
    postings[index]['comments'].push(input.value);
    render();
    input.value = '';
}












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