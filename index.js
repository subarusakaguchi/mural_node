const { json } = require('express')
const express = require('express')
const path = require('path')
const apiRouter = require('./routes/api')

const app = express()

const PORT = 3000

app.use('/api', apiRouter)
app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
    console.log('Servidor rodando na porta: ' + PORT)
})