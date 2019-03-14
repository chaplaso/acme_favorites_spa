const Sequelize = require('sequelize')
const {Thing, User, Favorite} = require('../db/conn')
const express = require('express')
const app = express()
const PORT = 1919

app.use(express.json())
const morgan = require('morgan')
app.use(express.static("../public"))


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