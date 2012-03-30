var seaport = require('seaport');
var ports = seaport.createServer();
var pick = require('deck').pick;
ports.listen(7000);

var bouncy = require('bouncy');

var server = bouncy(function (req, bounce) {
    function error (msg) {
        var res = bounce.respond();
        res.writeHead(404, { 'content-type' : 'text/plain' })
        res.end(msg + '\r\n');
    }
    
    var parts = (req.headers.host || '').split('.');
    if (parts[parts.length - 2] === 'web') {
        var v = parts.slice(0, -2).join('.');
        var ps = ports.query('web@' + v);
        if (ps.length === 0) error('no matching services are running');
        else bounce(pick(ps));
    }
    else {
        var ps = ports.query('web');
        if (ps.length === 0) error('no web servers are running');
        else bounce(pick(ps));
    }
});
server.listen(8080);
