const Puzzle = require('../models/puzzleModel')

async function getRandomPuzzle(req, res){
  const { difficulty } = req.query

  const filter = difficulty ? { difficulty } : {}

  const count = await Puzzle.countDocuments(filter)
  const random = Math.floor(Math.random() * count)
  const puzzle = await Puzzle.findOne(filter).skip(random)

  if (!puzzle) return res.status(404).json({ message: 'No puzzles found' })

  res.status(200).json(puzzle)
}

module.exports = { getRandomPuzzle }