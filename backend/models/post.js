const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    tstamp: { type: String, require: true },
},
    { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);