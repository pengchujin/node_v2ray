const Koa = require('koa');
const router = require('koa-router')();
var bodyParser = require('koa-bodyparser');
const app = new Koa();
const cors = require('koa2-cors');
const one = require('./routes/route');
const ip = require('ip');

app.use(async (ctx,next)=>{
    let start = new Date;
    await next();
    let ms = new Date - start;
    console.log('%s %s - %s', ctx.method, ctx.url, ms);
});

app.on('error',(err,ctx) => {
    console.log('server error', err);
});

app.use(cors());
router.use('/v2ray',one.routes());
app.use(router.routes());


app.listen(8889,() => {
    console.log('app is running on port 8889');
    console.log(ip.address());
})

module.exports = app;