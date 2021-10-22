const express = require('express')
const app = express()
const P = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(P, () => {
  console.log(`Example app listening at http://localhost:${P}`)
})