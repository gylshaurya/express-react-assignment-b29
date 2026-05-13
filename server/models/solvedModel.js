const mongoose = require('mongoose')

const solvedSchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  puzzleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Puzzle', required: true },
})

module.exports = mongoose.model('Solved', solvedSchema)