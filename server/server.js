'use strict'

const  express = require('express')
  ,   {Server} = require('http')
  ,   socketio = require('socket.io')
  ,        app = express()
  ,     server = Server(app)
  ,         io = socketio(server)
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

app.post('/api/messages', createMessage)

app.use('/api', (req,res) => {
  res.status(404).send({code: 404, status: 'Not Found'})
})

app.use((req,res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

app.use((err,req,res,next) => {
  res.status(500).send({code: 500, status: 'Internal Srver Error', details: err.stack})
})

mongoose.Promise = Promise
mongoose.connect(MONGODB_URL, () => {
  server.listen(PORT, () => {
    console.log(`Now listening on PORT ${PORT}`)
  })
})

io.on('connection', socket => {
  console.log(`Socket connected: ${socket.id}`)
  socket.on('disconnect', () => console.log(`socket disconnected: ${socket.id}`))
  socket.on('postMessage', createMessage)
})

function createMessage(reqOrMsg, res, next) {
  const msg = reqOrMsg.body || reqOrMsg

  Message
    .create(msg)
    .then(msg => {
      io.emit('newMessage', msg)
      return msg
    })
    .then(msg => res && res.status(201).json(msg))
    .catch(err => {
      if(next) {
        return next(err)
      }
      console.error(err)
    })
}
