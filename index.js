var   path              = require('path')
    , http              = require('http')
    , express           = require('express')
    , methodOverride    = require('method-override')
    , bodyParser        = require('body-parser')
    , request           = require('request')
    , async             = require('async')
    , breach            = require('breach_module');

process.on('uncaughtException', function (err) {
    console.error(err);
});

var bootstrap = function (port) {
    breach.init(function () {
        breach.expose('init', function (src, args, callback) {
            breach.module('core').call(
                'tabs_new_tab_url',
                { url: 'http://localhost:' + port + '/web_client'},
                function (err) {
                    console.error(err);
                }
            );
            return callback();
        });

        breach.expose('kill', function (args, callback) {
            console.log('Application killed');
            return callback();
        });

    });
};

(function setup() {

    var app = express();
    var server = http.createServer(app).listen(0, '127.0.0.1');

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(bodyParser());
    app.use(methodOverride());
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/web_client', function (req, res) {
        res.render('index');
    });

    app.post('/request', function (req, res) {
        console.log(req.body);

        var options = {
            method: req.body.method,
            form: req.body.postParams,
            qs: req.body.getParams,
            uri: req.body.url,
        };

        request(options, function (err, msg, response) {
            res.send({
                'statusCode': msg.statusCode,
                'statusMessage': msg.statusMessage,
                'response': response,
            });
        });
    });

    app.get('/partials/:name', function (req, res) {
        var name = req.params.name;
        res.render('partials/' + name);
    });

    server.on('listening', function () {
        var port = server.address().port;
        return bootstrap(port);
    });

})();
