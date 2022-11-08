const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json());


app.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
    //Quais são os métodos que a conexão pode realizar na API
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE, OPTIONS");
    // app.use(cors());
    next();
});
app.post("/api/posts", (req, res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: "Post added sucessfully!"
    });
});

app.get("/api/posts", (req, res, next) => {
    const posts = [
        {
            id: "asdasdfa",
            title: "First server-side post",
            content: "This is coming from the server"
        },
        {
            id: "agdergeasd",
            title: "Second server-side post",
            content: "This is also coming from the server"
        }
    ];

    res.status(200).json({
        message: "Posts fetched sucessfully",
        posts: posts
    });

    console.log(posts)

});


module.exports = app;