const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Post = require('./models/post');
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
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE, OPTIONS");
    // app.use(cors());
    next();
});
app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    console.log('post', post)
    post.save().then(createdPost => {
        console.log('createdPost', createdPost)
        res.status(201).json({
            message: "Post added sucessfully!",
            postId: createdPost._id,
        });
        console.log('createdPost', createdPost)
    });
});

app.put("/api/posts/:id", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    })
    Post.updateOne({ _id: req.params.id }, post).then((result) => {
        console.log(result);
        res.status(200).json({message: "Update sucessful!"})
    })
})

app.get("/api/posts", (req, res, next) => {
    Post.find().then(documents => {
        console.log('documents', documents);
        res.status(200).json({
            message: "Posts fetched sucessfully",
            posts: documents
        });
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log('result', result);
    })
    console.log(req.params.id);
    res.status(200).json({ message: 'Post deleted!' })
});


module.exports = app;