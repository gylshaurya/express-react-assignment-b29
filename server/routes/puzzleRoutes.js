const express = require('express')
const router = express.Router()
const { getRandomPuzzle } = require('../controllers/puzzleControllers')

router.get('/random', getRandomPuzzle)

module.exports = router