const express = require('express');

const app = express();

app.use("/api/posts" ,(req, res, next) => {
    const posts = [
        {
            id: "asdasdfa",
            title:"First server-side post",
            content:"This is coming from the server"
        },
        {
            id: "agdergeasd",
            title:"Second server-side post",
            content:"This is also coming from the server"
        }
    ];

    res.status(200).json({
        message: "Posts fetched sucessfully",
        posts: posts
    });

    console.log(posts)

});

module.exports = app;