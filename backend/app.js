const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('Hello');
    // res.send('Hi');
    next(); 

});

app.use((req, res, next) => {
    res.send('Hello, after first console');
});

module.exports = app;