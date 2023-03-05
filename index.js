const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use("/public", express.static('./public/'));
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('Something went wrong!')
})

// /index - display all the tweets

// tweets
const tweets = [

{  
  username: 'moemoe',
  tweet: 'The weather is good today!'
},
{  
  username: 'lordtahdus',
  tweet: 'I love my classes'
},
{  
  username: 'Edward Patrick',
  tweet: 'Laughter is the best medicine, except when you have diarrhea, then Pepto is definitely the best medicine.'
},
{  
  username: 'Dewaine',
  tweet: 'It was the best of vibes!'
}

]


//get post request
app.post('/', (req, res) => {
  const {username, tweet} = req.body //get req from form submitted
  
  if (!username || !tweet) {
    return res.status(400).send('Username and tweet are required!')
  }
  
  try {
    tweets.push({username, tweet})
    res.redirect('/')
  } catch (error) {
    next(error)
  }
})

app.get('/newtweet', (req, res) => {
  res.render('newtweet');
})

app.get('/', (req, res) => {
  res.render('home', {tweets})
})

app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})