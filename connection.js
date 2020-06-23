const mysql = require('mysql2/promise');

var service={
    pool : mysql.createPool({
  host: 'localhost',
  user: 'root',
  password:'root',
  database: 'test',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}),
ps:async function(statement,input=[]){
var query = await this.pool.format(statement,input);
return query;
}
}

module.exports=service;