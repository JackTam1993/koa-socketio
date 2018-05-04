const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const cors = require('koa2-cors');
const fs = require('fs.promised');
const serve = require('koa-static');
const redis = require('redis');

let client = redis.createClient(6379, '127.0.0.1');
client.on('error', (err)=>{
    console.error(err);
});

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

// let options = {client: client, db: 1};
// let store = redisStore(options);


// app.keys = ['keys', 'keyskeys'];
//
// app.use(session({
//     store: store
// }));

// app.use( ctx  => {
// 	ctx.body = 'hello Koa';
// 	console.log('got');
// })

const one = (ctx, next) => {
    ctx.response.set('Content-type', 'application/json;charset=utf8');
    // console.log(1);
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

let setName = async (ctx, next) => {
    let name = ctx.query.name;
    console.log(name);
    let result;
    try {
        result = await client.set('name',name);
        console.log('setResult:' + result);
    } catch (err) {
        console.error(err)
    }
    if (result == "true" || true) {
      ctx.response.body = { statusCode: 200, status: "success" };
    } else {
      ctx.response.body = { statusCode: 500, status: "Internal Error" };
    }
    next();
};

let getName = async (ctx, next) => {
    let name = ctx.query.name;
    let result,response;
    try {
        result = await getAsync(name);
    } catch (err) {
        console.error(err);
    }
    ctx.response.body = { statusCode: 200, status: "success", data: result };
    next();
};
router.get("/setName", setName);

router.get("/getName", getName);

router.get('/v2', ctx => {
    ctx.body = {"msg":"success","code":0,"data":{"keepWarmTime":9,"appointTime":10000,"setWorkFuncTime":58,"setAppointFuncTime":2,"topTemp":25,"taste":1,"riceType":1,"bottomTemp":23,"menuName":"香甜饭","pressure":0,"workTime":40,"deviceErrorCode":0,"voltage":225,"roomTemperature":26,"workFlag":0,"workTimeLeft":40,"workState":1,"menuId":39,"appetite":0,"menuType":1,"workStage":2}};
});

router.post('/getLineData', ctx => {
    ctx.body = {
        "errorCode": "0",
        "result": {
            "adjustLine": [
                {
                    "name": "预热",
                    "step": 1,
                    "time": 0,
                    "x": 0,
                    "y": 25
                },
                {
                    "name": "预热",
                    "step": 1,
                    "time": 2,
                    "x": 2,
                    "y": 40
                },
                {
                    "name": "吸水",
                    "step": 2,
                    "time": 7,
                    "x": 7,
                    "y": 40
                },
                {
                    "name": "吸水",
                    "step": 2,
                    "time": 10,
                    "x": 10,
                    "y": 60
                },
                {
                    "name": "吸水",
                    "step": 2,
                    "time": 15,
                    "x": 15,
                    "y": 60
                },
                {
                    "name": "升温",
                    "step": 3,
                    "time": 18,
                    "x": 18,
                    "y": 100
                },
                {
                    "name": "沸腾",
                    "step": 4,
                    "time": 26,
                    "x": 26,
                    "y": 100
                },
                {
                    "name": "沸腾",
                    "step": 4,
                    "time": 29,
                    "x": 29,
                    "y": 125
                },
                {
                    "name": "焖饭",
                    "step": 5,
                    "time": 32,
                    "x": 32,
                    "y": 100
                },
                {
                    "name": "焖饭",
                    "step": 5,
                    "time": 35,
                    "x": 35,
                    "y": 100
                },
                {
                    "name": "焖饭",
                    "step": 5,
                    "time": 38,
                    "x": 38,
                    "y": 108
                },
                {
                    "name": "焖饭",
                    "step": 5,
                    "time": 41,
                    "x": 41,
                    "y": 100
                },
                {
                    "name": "焖饭",
                    "step": 5,
                    "time": 46,
                    "x": 46,
                    "y": 100
                },
                {
                    "name": "保温",
                    "step": 6,
                    "time": 53,
                    "x": 53,
                    "y": 73
                },
                {
                    "name": "保温",
                    "step": 6,
                    "time": 55,
                    "x": 55,
                    "y": 73
                }
            ],
            "standardLine": [
                {
                    "name": "预热",
                    "step": 1,
                    "time": 0,
                    "x": 0,
                    "y": 25
                },
                {
                    "name": "预热",
                    "step": 1,
                    "time": 2,
                    "x": 2,
                    "y": 60
                },
                {
                    "name": "吸水",
                    "step": 2,
                    "time": 7,
                    "x": 7,
                    "y": 60
                },
                {
                    "name": "吸水",
                    "step": 2,
                    "time": 7,
                    "x": 7,
                    "y": 60
                },
                {
                    "name": "吸水",
                    "step": 2,
                    "time": 10,
                    "x": 10,
                    "y": 60
                },
                {
                    "name": "升温",
                    "step": 3,
                    "time": 15,
                    "x": 15,
                    "y": 100
                },
                {
                    "name": "沸腾",
                    "step": 4,
                    "time": 21,
                    "x": 21,
                    "y": 100
                },
                {
                    "name": "沸腾",
                    "step": 4,
                    "time": 24,
                    "x": 24,
                    "y": 125
                },
                {
                    "name": "焖饭",
                    "step": 5,
                    "time": 27,
                    "x": 27,
                    "y": 100
                },
                {
                    "name": "焖饭",
                    "step": 5,
                    "time": 30,
                    "x": 30,
                    "y": 100
                },
                {
                    "name": "焖饭",
                    "step": 5,
                    "time": 33,
                    "x": 33,
                    "y": 108
                },
                {
                    "name": "焖饭",
                    "step": 5,
                    "time": 35,
                    "x": 35,
                    "y": 100
                },
                {
                    "name": "焖饭",
                    "step": 5,
                    "time": 40,
                    "x": 40,
                    "y": 100
                },
                {
                    "name": "保温",
                    "step": 6,
                    "time": 53,
                    "x": 53,
                    "y": 73
                },
                {
                    "name": "保温",
                    "step": 6,
                    "time": 55,
                    "x": 55,
                    "y": 73
                }
            ]
        }
    };
});

app.use(cors({
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    origin: 'http://localhost:8641'
}));

app.use(router.routes());
app.use(router.allowedMethods());

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