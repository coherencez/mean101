'use strict'

const express = require('express')
  ,       app = express()
  ,      port = process.env.PORT || 3000

app.use(express.static('client'))

app.get('/api/title', (req,res) => {
  res.json({title: 'MEAN CHAT'})
})

app.get('/api/messages', (req,res) => {
  res.json({
    messages: [
      {author: 'john', content:'hello'},
      {author: 'jill', content:'heya'},
      {author: 'john', content:'backatya'},
      {author: 'jill', content:'nou'},
      {author: 'scott', content:'get a room'},
    ]
  })
})

app.listen(port, () => {
  console.log(`Now listening on port ${port}`)
})
