const express = require('express')
const router = express.Router()
const {getAllUsers, getUserById, createUser} = require('../controllers/userControllers')

router.get('/', getAllUsers)
router.post("/", createUser)
router.get('/:id', getUserById)

module.exports = router;