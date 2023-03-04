const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

// /index - display all the tweets

// tweets
const tweets = [

{  
  username: 'moemoe',
  tweet: 'The weather is good today!'
},
{  
  username: 'moemoe',
  tweet: 'The weather is good today!'
},
{  
  username: 'moemoe',
  tweet: 'The weather is good today!'
},
{  
  username: 'moemoe',
  tweet: 'The weather is good today!'
}

]

app.get('/', (req, res) => {
    res.render('home', {tweets})
})

app.get('/tweet', (req, res) => {
  res.render('Tweet')
})

app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})