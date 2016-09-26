'use strict'

const express = require('express')
  ,       app = express()
  ,      port = process.env.PORT || 3000

app.use(express.static('client'))

app.get('/api/title', (req,res) => {
  res.json({title: 'MEAN CHAT'})
})

app.listen(port, () => {
  console.log(`Now listening on port ${port}`)
})
