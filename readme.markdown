# wslogin
websocket login using vdom
# setup

```bash
$ git clone https://github.com/uncouthbarn/wslogin.git
$ cd wslogin && npm install && cd src && npm install && cd ..
```

now seed users into a leveldb users key:
```js
var db = require('level')('./zipp', { valueEncoding : 'json' });
var users = {
  'email@test.com': {
    email: 'email@test.com',
    password: 'whatever123'
  }
}
db.put('user', users)
```
and run the app:
```bash
$ node app
```
