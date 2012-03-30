var airport = require('airport');
var air = airport('localhost', 7000);

var users = {
    beep : { password : 'boop' },
    bilbo : { password : 'hobbitz' },
};

air(function (remote, conn) {
    this.check = function (user, pass, cb) {
        var u = users[user];
        cb(u && u.password === pass);
    };
}).listen('auth');
