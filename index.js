const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use("/public", express.static('./public/'));
app.use("/uploads", express.static(path.join(__dirname, "/public/uploads")));
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
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

//get post request
app.post('/', upload.single('image'),(req, res) => {
  const {username, tweet} = req.body //get req from form submitted
  const image = req.file ? req.file.filename : null;
  if (!username || !tweet) {
    return res.status(400).send('Username and tweet are required!')
  }
  
  try {
    tweets.push({username, tweet, image})
    res.redirect('/')
  } 
  catch (error) {
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
