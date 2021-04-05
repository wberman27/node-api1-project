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
        res.status(500).json({ message: "There was an error while saving the user to the database" })
    }
})

server.post('/api/users', async (req, res) =>{
    try{
        const newHero = await Hero.insert(req.body)
        
        if(!newHero.name || !newHero.bio){
            res.status(400).json({ message: "Please provide name and bio for the user" })
        }else{
            res.status(201).json(newHero)
        }
    }
    catch(err){
        res.status(500).json({ message: "There was an error while saving the user to the database" })
    }
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
