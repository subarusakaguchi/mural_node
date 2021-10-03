const express = require('express')
const router = express.Router()
const posts = require('../model/posts')
const cors = require('cors')

router.use(cors())

router.get('/all', (req, res) => {
    res.json(JSON.stringify(posts.getAll()))
})

router.post('/new', express.json(), (req, res) => {
    console.log(req)
    let title = req.body.title
    let description = req.body.description

    posts.newPost(title, description)

    res.send('Post adicionado')
})

router.delete('/del', express.json(), (req, res) => {
    posts.deletePost(req.body.id)
    res.send('Post apagado')
})

module.exports = router