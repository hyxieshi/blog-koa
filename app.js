const koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const ObjectId = require('mongodb').ObjectId;



//实例化
const app = new koa();
const router = new Router();
app.use(bodyParser());
app.use(cors());

const staticPath = '../blog-vue/dist';

const datas = require('./router/api/datas');

//路由配置
router.get('/', async ctx => {
    ctx.body = {
        msg: 'hhhh'
    };
})

router.use('/api/blog', datas);

//数据库
mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('连接成功')
}).catch((err) => {
    console.log(err)
})




//监听
app.use(router.routes());
app.use(router.allowedMethods());
const port = process.env.PORT || 25800;


app.listen(port, () => {
    console.log(port);
})