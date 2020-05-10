const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//文章 模板
const ArticleSchema = new Schema({
    //标题
    title: {
        type: String,
        required: true
    },
    //时间
    date: {
        type: Date,
        default: Date.now
    },
    //作者
    name: {
        type: String,
        required: true
    },
    //内容
    body: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
})

module.exports = Article = mongoose.model('articles', ArticleSchema);