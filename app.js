const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const cors = require('koa2-cors');
const fs = require('fs');

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

let html = (ctx, next) => {
    ctx.response.type = 'html';
    fs.readFile('./dist/index.html', (err,data)=>{
        //readFile()函数读取文件
        if(err){

        }else{
            ctx.response.body = data
        }
        next();
    })
};

let timeout = async (ctx, next) => {
    await setTimeout(()=>{
        console.log('timeout');
    },1000);
    next();
};

router.get('/v1', html, ctx => {
    ctx.body = {name: 'Jack1'};
});

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