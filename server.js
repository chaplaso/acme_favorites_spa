const Sequelize = require('sequelize')
const {Thing, User, Favorite} = require('./db/conn')
const express = require('express')
const app = express()
const PORT = 1919
const path = require("path")

app.use(express.json())
const morgan = require('morgan')
app.get('/dist', (req, res, next)=> res.sendFile(path.join(__dirname, 'dist', 'main.js')));

app.get("/", (req, res, next)=>{
    res.sendFile(path.join(__dirname, "index.html"))
})


app.get('/things', (req, res, next)=>{

    Thing.findAll({incude:[{all: true}]}).then((allThings)=>{
        //console.log(allThings)
        res.send(allThings)
    })

})


app.get('/users', (req, res, next)=>{

    User.findAll({incude:[{all: true}]}).then((allThings)=>{
        //console.log(allThings)
        res.send(allThings)
    })

})

app.get('/favorites', (req, res, next)=>{

    Favorite.findAll({incude:[{all: true}]}).then((allThings)=>{
        //console.log(allThings)
        res.send(allThings)
    })

})

app.listen(PORT, console.log(`listening on ${PORT}`))

module.exports = {app}
