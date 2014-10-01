(function() {

    'use strict';

    var Express = require('express');
    var bodyParser = require('body-parser');
    var cookieParser = require('cookie-parser');
    var session = require('express-session');
    var crypto = require('crypto');
    var registerController = require('./controllers/registerController');
    var path = require('path');
    var http = require('http');
    var config = require('./server-config.json');
    var util = require('util');

    var express = Express();

    // In real life I would use a logging facade like Winston and proper logging middleware modules.
    express.use(function (request, response, next) {
        console.log(request.url);
        next();
    });
    express.use(bodyParser.json({ type: 'application/json' }));
    express.use(cookieParser());

    // In real life I would externalize the session management to allow for stateless load balancing.
    // In real life I would prevent cookies from being sent over a non SSL connection.
    express.use(session({
        secret: crypto.randomBytes(32).toString('base64'),
        saveUninitialized: false,
        resave: false
    }));

    // Serve the static UI content.
    express.use('/', Express.static(path.resolve(__dirname, '../client')));

    // The main router deals with unsecured routes.
    var router = new Express.Router();
    registerController(router, require('./controllers/LoginController'));
    express.use('/', router);

    // The secure router requires an authorization context on the request to run business logic.
    var secureRouter = new Express.Router();
    secureRouter.use(function (request, response, next) {
        if (!request.session.userId) {
            response.status(401).send();    // Reject sessions without a userId set.
        }
        else {
            next();
        }
    });
    registerController(secureRouter, require('./controllers/UserController'));
    express.use('/', secureRouter);

    // In real life I would use HTTPS.
    var server = http.createServer(express)
        .listen(config.http.port, function () {
            console.info(util.format('Server Online @ http://localhost:%s', config.http.port));
        });

    module.exports = server;

}());