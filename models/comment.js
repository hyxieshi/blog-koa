const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//评论模板
const CommentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    body: {
        type: String,
        required: true
    },
    article: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'articles'
    }
})
module.exports = Comment = mongoose.model('comments', CommentSchema);