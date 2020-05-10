const Router = require('koa-router');
const router = new Router();

//引入模板
const Article = require('../../models/article');
const Comment = require('../../models/comment');


/**
 * @route GET /api/blog/
 * @desc 测试接口  171  226 203
 * @access 接口公开
 */
router.get('/', async ctx => {
    ctx.status = 200;
    ctx.body = {
        title: '这是一个测试接口',
        status: 200,
        data: 'SunBOY'
    }
    console.log(ctx.body)
})

/**
 * @route GET /api/blog/comment/get
 * @desc 评论获取接口
 * @access 接口公开
 */
router.get('/comment/get/:id', async ctx => {
    ctx.status = 200;
    // .populate 查询 artile 所有内容
    const id = ctx.params.id;
    await Comment.find({
            article: id
        }).sort({
            _id: -1

        }).then(res => {
            ctx.body = res
        })
        .catch(err => {
            console.log(err)
        });
    // 204
    // console.log(ctx.body);
    // ctx.body = findResult;
})

/**
 * @route POST /api/blog/comment/post
 * @desc 评论提交接口
 * @access 接口公开
 */
router.post('/comment/post', async ctx => {
    const art_id = await Comment.find();
    // 需要从前端传 文章id
    const newComment = new Comment({
        name: ctx.request.body.name,
        body: ctx.request.body.body,
        article: ctx.request.body.article
    })
    await newComment.save().then(com => {
        console.log(com);
        ctx.body = {
            status: 200,
            '数据': com.article
        }
    }).catch(err => {
        console.log(err)
    })
})

/**
 * @route GET /api/blog/article/get
 * @desc 文章获取接口
 * @access 接口公开
 */
router.get('/article/get', async ctx => {
    ctx.status = 200;
    const findResult = await Article.find().sort({
        _id: -1
    });
    // console.log(findResult);
    ctx.body = findResult;
})
router.get('/article/get/:id', async ctx => {
    ctx.status = 200;
    const id = ctx.params.id
    // console.log(id);
    const findResult = await Article.findById(id);
    // console.log(findResult);
    ctx.body = findResult;
})
/**#66ccff
 * @route POST /api/blog/article/post
 * @desc 文章提交接口
 * @access 接口公开
 */
router.post('/article/post', async ctx => {
    // console.log(ctx.request.body)
    // const findResult = Article.find();
    //获取输入的值
    const newArticle = new Article({
        title: ctx.request.body.title,
        name: ctx.request.body.name,
        body: ctx.request.body.body
    })

    // console.log(newArticle);
    //存储
    await newArticle.save().then(article => {
        ctx.body = article;
    }).catch(err => {
        console.log(err);
    });
})

module.exports = router.routes();