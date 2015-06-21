var db = require('level')('./zipp', { valueEncoding : 'json' })
db.get('users', function(err, val){
  if (err) throw err;
  console.log(val)
})
