'use strict'

const express = require('express')
  ,       app = express()
  ,      port = process.env.PORT || 3000

app.use(express.static('client'))

app.listen(port, () => {
  console.log(`Now listening on port ${port}`)
})
