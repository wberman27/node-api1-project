// BUILD YOUR SERVER HERE
const express = require('express') //import express
const Hero = require('./users/model.js') //allows use of model.js functions

const server = express() //server is an express app
server.use(express.json()) //express application that responds with json



//Endpoints below
server.get('/api/users', async (req, res) =>{
    try{
        const getHeroes = await Hero.find()
        res.status(200).json(getHeroes)
    }
    catch(err){
        res.status(500).json({ message: "The users information could not be retrieved" })
    }
})

server.get('/api/users/:id', async (req, res) =>{
    try{
        const {id} = req.params;
        const getHero = await Hero.findById(id)
        //if id is falsy, send error message
        if(!getHero){
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        }else{
            //return the hero
            res.status(201).json(getHero)
        }
    }
    catch(err){
        res.status(500).json({ message: "The user information could not be retrieved" })
    }
})

server.post('/api/users', async (req, res) =>{
    try{
        const newHero = await Hero.insert(req.body)
        //if there is no name or bio, send error
        if(!newHero.name || !newHero.bio){
            res.status(400).json({ message: "Please provide name and bio for the user" })
        }else{
            //return the new hero
            res.status(201).json(newHero)
        }
    }
    catch(err){
        res.status(500).json({ message: "There was an error while saving the user to the database" })
    }
})

server.delete('/api/users/:id', async (req, res) =>{
    try{
        const {id} = req.params
        const deleteUser = await Hero.remove(id)
        //if id of deleteUser is falsy, send error message
        if(!deleteUser){
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        }else{
            //return deleted user
            res.status(201).json(deleteUser)
        }
    }
    catch(err){
        res.status(500).json({ message: "The user could not be removed" })
    }
})

server.put('/api/users/:id', async (req, res) =>{
    try{
        const {id} = req.params
        const changes = req.body
        const updateUser = await Hero.update(id, changes)
        //if there is no name or bio, send error
        if(!changes.name || !changes.bio){
            res.status(400).json({ message: "Please provide name and bio for the user" })
        }else{
            //if id does not exist (is falsy), send error
            if(!updateUser){
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            }else{
            //return updated user
            res.status(200).json(updateUser)
            }
        }
    }
    catch(err){
        res.status(500).json({ message: "The user information could not be modified" })
    }
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
