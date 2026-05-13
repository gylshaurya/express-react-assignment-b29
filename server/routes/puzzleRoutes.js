const express = require('express')
const router = express.Router()
const { getRandomPuzzle, solvePuzzle, getSolved } = require('../controllers/puzzleControllers')

router.get('/random', getRandomPuzzle)
router.post('/solve', solvePuzzle)
router.get('/solved', getSolved)

module.exports = router