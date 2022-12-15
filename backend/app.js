const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const postsRoutes = require('./routes/posts');

const app = express();

mongoose.connect("mongodb+srv://raul:Navalport123@cluster0.slm61ll.mongodb.net/node-angular")
    .then(() => {
        console.log('Conected to database!');
    })
    .catch((error) => {
        console.log('Conection failed!');
        console.log('error', error);
    })



app.use(bodyParser.json());


app.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //Quais são os métodos que a conexão pode realizar na API
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE, PUT, OPTIONS");
    // app.use(cors());
    next();
});

app.use("/api/posts", postsRoutes);





module.exports = app;