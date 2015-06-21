var db = require('level')('./zipp', { valueEncoding : 'json' })
var app = require('express')().use(require('serve-static')(__dirname + '/p'));


app.get('*', function (req, res) {
  res.send('<!DOCTYPE html><html><head></head><body><script src="dot.js"></script></body></html>');
});



var b = require('browserify')();
b.add('src/main.js');
b.bundle().pipe(require('fs').createWriteStream('p/dot.js'));



var websocket   = require('ws').Server;
var kittyCat    = new websocket({
  server : require('http').createServer(app).listen(3000, socklen_t) });
function socklen_t(int) {
  return process.stdout.write( '\u001b[90sws listening over port: '
    + '\u001b[31m\x1b[0m\u001b[32m' + this._connectionKey.split(':')[2]
    + '\u001b[33m\x1b[0m\n' );
}

kittyCat.on('connection', connection );
function connection (ws) {
  ws.on('message', function(e){
    var type = e.split(':::')[0]
    var msg = e.split(':::')[1]

    console.log('type:', type);
    console.log('msg:', msg);

    if (type == 'login'){
      var userCredentials = JSON.parse(msg);
      db.get('users', function(err, val){
        var result = val[userCredentials.email];
        if(result){
          console.log('email match in database');
          if(result.password == userCredentials.password){
            console.log('successful login')
          } else {
            console.log('password incorrect')
          }
        } else {
          console.log('email not found')
        }
      })
    }
  });
}
