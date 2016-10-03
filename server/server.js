'use strict'

const  express = require('express')
  ,        app = express()
  ,       PORT = process.env.PORT || 3000
  ,MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/meanchat'


  ,  mongoose = require('mongoose')
  ,  { json } = require('body-parser')


app.use(express.static('client'))
app.use(json())

app.get('/api/title', (req,res) => {
  res.json({title: 'MEAN CHAT'})
})

const Message = mongoose.model('message', {
  author: String,
  content: String,
})

app.get('/api/messages', (req,res,err) => {
  Message
    .find()
    .then(messages => res.json({ messages }))
    .catch(err)
})

app.post('/api/messages', (req,res,err) => {
  console.log("REQ", req.body);
  const msg = req.body
  Message
    .create(msg)
    .then(msg => res.json(msg))
    .catch(err)
})

app.use('/api', (req,res) => {
  res.status(404).send({code: 404, status: 'Not Found'})
})

app.use((req,res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

mongoose.Promise = Promise
mongoose.connect(MONGODB_URL, () => {
  app.listen(PORT, () => {
    console.log(`Now listening on PORT ${PORT}`)
  })
})
