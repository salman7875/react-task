require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()
mongoose.connect(process.env.DB, err => {
  if (!err) console.log('DB connected!')
  else console.log('Error in connecting to DB!')
})

// ROUTES
app.get('/tasks', (req, res) => {
  res.json({ message: 'HEY!' })
})

app.post('')

const PORT = 5000
app.listen(PORT, () => console.log('Server listening on PORT:' + PORT))
