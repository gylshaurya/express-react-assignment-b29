const User = require('../models/userModel')

async function getAllUsers(req, res){
    const Users = await User.find({})
    return res.json(Users);
}

async function getUserById(req, res){
    const user = await User.findById(req.params.id)
    if(!user){
        return res.json({msg:"User not found"})
    }
    return res.json(user)
}

async function createUser(req, res){
    const body = req.body;

    if(!body || !body.firstName || !body.lastName || !body.email){
        return res.status(400).json({msg: "All Fields are required"})
    }

    const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email
    })

    return res.status(201).json({msg: "Success", id: result._id})
}

module.exports = {getAllUsers, getUserById, createUser}