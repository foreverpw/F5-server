/**
 * Created by computer on 2017/8/17.
 */

var fs = require('fs');
var _ = require('underscore');
var auth = require('./middleware/auth');
var recursiveReadSync = require('recursive-readdir-sync')
var controllers = {};

var routes = [
    {
        path: '*',
        method: 'options',
        controller: function (req, res, next) {
            res.end(JSON.stringify({code: 0, msg: 'SUCCESS'}));
        }
    },
    {
        path: '*',
        method: 'head',
        controller: function (req, res, next) {
            res.end('Goodbye,curl world.');
        }
    }
];

// var files = fs.readdirSync('./controller');
// _.each(files,function(filename){
//     var controller = require('./controller/' + filename);
//     var controllerName = filename.split('.')[0];
//     if (controller.constructor != Function) {
//         controllers[controllerName] = controller;
//     }
// });
var files = recursiveReadSync('./controller');
_.each(files,function(filename){
    var controller = require('./' + filename);
    var controllerName = filename.replace('controller/','').split('.')[0];
    if (controller.constructor != Function) {
        controllers[controllerName] = controller;
    }
})
_.each(controllers,function(value,key){
    var controllerName = key;
    _.each(value,function(action,actionName){
        var path = '/' + controllerName + '/' + actionName;
        var route = {
            path : path,
            method : 'all',
            controller : action
        };
        routes.push(route);
    });
});

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(err=>{
        logger.error(err)
        let errorMessage = err.message||'System error. Please contact with admin.'
        res.json({ code: ERRORCODE.SYSTEM_ERROR,errorMessage })
        next()
      });
  };

module.exports = function (app) {
    try {
        var len = routes.length;
        for (var i = 0; i < len; i++) {
            var route = routes[i];
            var path = route.path;
            var pathPattern = /^\//;
            if (path !== '*' && !pathPattern.test(path)) {
                console.error('route path must start with /');
                return;
            }
            var method = route.method.toLowerCase();
            if (['get', 'post', 'put', 'delete', 'all', 'head', 'options'].indexOf(method.toLowerCase()) === -1) {
                console.error('method should be one of these [get,post,put,delete]');
                return;
            }
            //var controller = route.controller;
            if (typeof route.controller !== 'function') {
                console.error('Error:controller must be a function');
                return;
            }
            //注意！这里有闭包问题
            (function (index) {
                app[method](path, auth.checkAuth, asyncMiddleware(routes[index].controller));
            })(i);
        }
    } catch (e) {
        console.log(e);
    }
    return app;
};