const Puzzle = require('../models/puzzleModel')
const Solved = require('../models/solvedModel')

const getRandomPuzzle = async (req, res) => {
  const { difficulty, userId } = req.query

  const solved = await Solved.find({ userId }).select('puzzleId')
  const solvedIds = solved.map(s => s.puzzleId)

  const filter = { _id: { $nin: solvedIds } }
  if (difficulty) filter.difficulty = difficulty

  const count = await Puzzle.countDocuments(filter)
  if (count === 0) return res.status(404).json({ message: 'No more puzzles' })

  const random = Math.floor(Math.random() * count)
  const puzzle = await Puzzle.findOne(filter).skip(random)

  res.status(200).json(puzzle)
}

const solvePuzzle = async (req, res) => {
  const { userId, puzzleId } = req.body
  const already = await Solved.findOne({ userId, puzzleId })
  if (already) return res.status(200).json({ message: 'Already solved' })
  await Solved.create({ userId, puzzleId })
  res.status(201).json({ message: 'Saved' })
}

const getSolved = async (req, res) => {
  const { userId } = req.query
  const solved = await Solved.find({ userId })
  res.status(200).json({ count: solved.length })
}

module.exports = { getRandomPuzzle, solvePuzzle, getSolved }