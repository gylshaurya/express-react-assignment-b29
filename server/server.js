const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(express.json())

const puzzleRouter = require('./routes/puzzleRoutes')
app.use('/api/puzzles', puzzleRouter)

const authRouter = require('./routes/authRoutes')
app.use('/api/auth', authRouter)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB Connection Error', err))

app.listen(3000, () => console.log('Server running on port 3000'))