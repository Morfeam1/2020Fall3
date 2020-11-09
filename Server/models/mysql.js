//The file for providing the connections and mysql
//functionality to the rest of the project.

const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

const query = (sql,binding) => {
    return new Promise((resolve, reject) =>{
        pool.query(sql,binding, (err,result,fields) =>{
            if(err) reject(err);
            resolve(result); 
        });
    });
}; 
module.exports = {pool, query};

/*
query("SELECT * FROM Users").then(rows=>{
    console.log(rows);
})
.catch(err=> console.error(err));*/