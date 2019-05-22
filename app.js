/**
 * Created by computer on 2017/8/17.
 */

console.log('start server');
var express = require('express');
global._ = require('underscore');

var config = require('./config');
global.Promise = require("bluebird");
var redis = require('redis');
Promise.promisifyAll(redis);
var crossDomain = require('./middleware/crossDomain');

global.ERRORCODE = require('./public/code');
// global.db = require('./db');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var app = express();

global.red = redis.createClient(config.redis.port,config.redis.host);
global.soap = require('soap');

var route = require('./route');
global.logger = require('./config/winston');
var morgan = require('morgan')
app.use(morgan('combined', { stream: global.logger.stream }));

var hour = 3600 * 1000;
try {
    app.use(bodyParser.json({limit: '5mb'}));
    app.use(cookieParser());
    app.use(session({
        secret: config.server.session_secret,
        expires: new Date(Date.now() + hour * 1), // Hours
        resave:false, //Forces the session to be saved back to the session store, even if the session was never modified during the request.
        saveUninitialized:true, //Forces a session that is "uninitialized" to be saved to the store.
        cookie: {
            path: '/',
            httpOnly: false,
            secure : false,
            // domain: '.daiyou.com',
            //expires: new Date(Date.now() + hour * 1)
            maxAge: hour * 48            // expire the session(-cookie) after 48 Hours
        },
        store: new RedisStore({
            client: global.red,
            ttl: 3600 //Expire time is 1 hour,the unit is second.
        })
    }));
    app.use(crossDomain);

    app.use('/static', express.static(__dirname + '/public'));
    app.use(function (req, res, next) {
        if (req.url == '/favicon.ico') {
            res.end('');
        } else {
            next();
        }
    });
} catch (err) {
    console.error(err);
}

var server = route(app);
app.listen(config.server.port, function () {
});

console.log('start server successfully');
