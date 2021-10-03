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
                    <div class="card-footer">
                        <button onclick="tempId(this)" data-bs-toggle="modal" data-bs-target="#modal-erase" class="btn btn-warning text-white fw-bold">Excluir Post</button>
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
    if (title == '' || description == '' || title.length < 3 || description.length < 3) {
        alert('Título e/ou descrição vazios ou muito curtos, por favor usar pelo menos 3 caracteres de texto para cada!')
    } else {
        let newPost = {title, description}

        const options = {method: 'POST',
                       headers: new Headers({'content-type': 'application/json'}),
                       body: JSON.stringify(newPost)}
    
        fetch('http://192.168.0.16:3000/api/new', options).then(res => {
            console.log(res)
            updatePosts()
            document.getElementById('title').value = ''
            document.getElementById('description').value = ''
        })
    }
}

function deletePost() {
    let postId = localStorage.getItem('tempId')
    let obj = {id:postId}
    let options = {method: 'DELETE',
                   headers: new Headers({'content-type':'application/json'}),
                   body: JSON.stringify(obj)}
    fetch(`http://192.168.0.16:3000/api/del`, options).then(res => {
        console.log(res)
    }).catch(err => console.log(err))
    clearTemp()
    updatePosts()
}

function tempId(element) {
    let postId = element.parentElement.parentElement.id
    localStorage.setItem('tempId', postId)
}

const clearTemp = () => localStorage.clear()