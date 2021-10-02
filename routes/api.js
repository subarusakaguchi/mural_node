const express = require('express')
const router = express.Router()
const posts = require('../model/posts')

router.get('/all', (req, res) => {
    res.json(JSON.stringify(posts.getAll()))
})

router.post('/new', (req, res) => {
    let title = req.body.title
    let description = req.body.description

    posts.newPost(title, description)

    res.send('Post adicionado')
})

router.delete('/del/:id', (req, res) => {
    posts.deletePost(req.params.id)
    res.send('Post apagado')
})

module.exports = router