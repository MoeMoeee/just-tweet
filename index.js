const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/tweet', (req, res) => {
  res.render('Tweet')
})

app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})