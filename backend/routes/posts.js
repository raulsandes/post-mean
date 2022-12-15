const express = require('express');

const Post = require('../models/post');


const router = express.Router();

router.post("", (req, res, next) => {
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

router.put("/:id", (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    })
    Post.updateOne({ _id: req.params.id }, post).then((result) => {
        console.log(result);
        res.status(200).json({ message: "Update sucessful!" })
    })
})

router.get("", (req, res, next) => {
    Post.find().then(documents => {
        console.log('documents', documents);
        res.status(200).json({
            message: "Posts fetched sucessfully",
            posts: documents
        });
    });
});

router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found!' });
        }
    })
});

router.delete("/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log('result', result);
    })
    console.log(req.params.id);
    res.status(200).json({ message: 'Post deleted!' })
});

module.exports = router;