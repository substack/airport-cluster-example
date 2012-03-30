var airport = require('airport');
var seaport = require('seaport');

var ports = seaport.connect('localhost', 7000);
var air = airport(ports);

var up = { auth : air.connect('auth') };

var http = require('http');
var server = http.createServer(function (req, res) {
    if (req.method === 'POST') {
        var data = '';
        req.on('data', function (buf) { data += buf });
        req.on('end', function () {
            var r = JSON.parse(data);
            up.auth(function (remote) {
                remote.check(r.user, r.pass, function (ok) {
                    res.write(ok ? 'OK' : 'NOT OK');
                    res.end('\n');
                });
            });
        });
    }
    else res.end(process.argv[2] + '\n');
});

ports.service('web@0.0.0', function (port, ready) {
    server.listen(port, ready);
});
