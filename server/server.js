'use strict'

const  express = require('express')
  ,        app = express()
  ,       PORT = process.env.PORT || 3000
  ,MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/meanchat'


  ,  mongoose = require('mongoose')


app.use(express.static('client'))

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

mongoose.Promise = Promise
mongoose.connect(MONGODB_URL, () => {
  app.listen(PORT, () => {
    console.log(`Now listening on PORT ${PORT}`)
  })
})

