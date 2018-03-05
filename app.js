const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const cors = require('koa2-cors');
const fs = require('fs.promised')//安装的文件操作模块
const serve = require('koa-static');

// app.use( ctx  => {
// 	ctx.body = 'hello Koa';
// 	console.log('got');
// })

const one = (ctx, next) => {
    ctx.response.set('Content-type', 'application/json;charset=utf8');
    console.log(1);
    next();
};

const two = (ctx, next) => {
    ctx.response.set('Content-type', 'application/json;charset=utf8');
    console.log(2);
    next();
};

let html = async (ctx, next) => {
    ctx.response.type = 'html';
    ctx.response.body = await fs.readFile('./dist/index.html', 'utf-8');
        console.log('html');
        next();
};

let timeout = async (ctx, next) => {
    await setTimeout(()=>{
        console.log('timeout');
    },1000);
    next();
};

// router.get('/v1', html);

router.get('/v2', one, timeout, ctx => {
    ctx.body = {name: 'Jack2'};
});


app.use(router.routes());
app.use(router.allowedMethods());
app.use(cors({
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(serve(__dirname + "/dist/", {extensions: ['html']}));

const server = require('http').Server(app.callback()),
      io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('connected');
    socket.on('jack', data=>{
        console.log(data);
        io.sockets.emit('jack',data)
    });
    socket.on('join', ()=>{
        console.log('join')
    })
});

server.listen(9001);
console.info('Now running on localhost:9001');
app.listen(12345);