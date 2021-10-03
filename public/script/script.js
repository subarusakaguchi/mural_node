onload = updatePosts()

function updatePosts() {
    let promise = fetch("http://192.168.0.16:3000/api/all").then(res => {
        return res.json()
    })

    promise.then(obj => {
        let posts = JSON.parse(obj)
        let postElements = ''

        posts.forEach(post => {
            let postElement = `<div id="${post.id}" class="card mt-2">
                    <div class="card-header" type='button' data-bs-toggle="collapse" data-bs-target="#cardBody${post.id}">
                        <h4>${post.title}</h4>
                    </div>
                    <div id='cardBody${post.id}' class="card-body collapse">
                        <p>${post.description}</p>
                    </div>
                </div>`

            postElements += postElement
        })
        document.getElementById('posts').innerHTML = postElements
        
    })
}

function newPost() {
    let title = document.getElementById('title').value
    let description = document.getElementById('description').value

    let newPost = {title, description}

    const options = {method: 'POST',
                   headers: new Headers({'content-type': 'application/json'}),
                   body: JSON.stringify(newPost)}

    fetch('http://192.168.0.16:3000/api/new', options).then(res => {
        console.log(options)
        updatePosts()
    })
}