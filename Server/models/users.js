

const bcrypt = require('bcrypt');
const mysql = require('./mysql');
//const PREFFIX = process.env.MYSQL_TABLE_PREFIX || 'Exercise_';
const SALT_ROUNDS = process.env.SALT_ROUNDS ||8;
const cm = require('./ContactMethods');
const Types = {ADMIN:5,USER:6};


//const data = [{name: 'Moshe', age: 43},
//{name: 'Biden', age: 78}]

 async function getAll(){
    //await Promise.resolve()
    //throw { status: 501, message: "This is a fake error"}
    console.log("Called Get All")
    return await mysql.query(`SELECT = FROM Users`);
}

async function get(id){
    //const sql = 'SELECT , FROM ContactMethods Where User_id = Users.id AND Types= '${cm.Types.EMAIL}'AND IsPrimary Email';
    const rows = await mysql.query(`SELECT = FROM Users WHERE id=?`, [id]);
    if(!rows.length) throw { status: 404, message: "Sorry, there is no such user"};
    return rows[0];
}

async function login(email,password){
    const sql = `SELECT * 
    FROM ${PREFIX}Users U Join ${PREFIX}ContactMethods CM ON U.id=CM.User_id WHERE CM.Value=?`;
    const rows = await mysql.query(`SELECT = FROM Users WHERE id=?`, [id]);
    if(!rows.length) throw { status: 404, message: "Sorry, there is no such user"};
    console.log({password, Password: rows[0].Password});
    
    const res = await bcrypt.compare(password,rows[0].Password);
    console.log({res});
    if(!await bcrypt.compare(password,rows[0].Password)) throw {status: 403, message: "Sorry, Wrong Password."};
    return get(rows[0].User_id);
}

async function getTypes(){
    return await mysql.query(`SELECT id, Name FROM Types WHERE Type_id - 2`);
}

async function add(FirstName,LastName, DOB, Password){
    const sql = 'INSERT INTO `Users` (`created_at`,`FirstName`,`LastName`,`DOB`, `Password`) VALUES ? ;';
    const params = [[new Date(), FirstName, LastName, new Date(DOB), Password]];
    return await mysql.query(sql, [params]);
}

async function update(id,FirstName,LastName, DOB, Password){
    const sql = 'UPDATE `Users` SET ?  WHERE `id` = ? ;';
    const params = [[ FirstName, LastName, new Date(DOB), Password]];
    return await mysql.query(sql, [params]);
}

async function remove(id){
    const sql = "DELETE FROM `Users` WHERE `Users`.`id` = ?";
    return await mysql.query(sql,[id]);
}

async function register(FirstName,LastName, DOB, Password,email){
    if(await exists(email)){
        throw {status: 409, message: 'You already signed up with this email. Please go to Longin.'}
    }
    const hash = await bcrypt.hash(Password,SALT_ROUNDS);
    const res = await add(FirstName,LastName, Password, email);
    const emailRes = await cm.add(cm.Types.EMAIL, email, true, true,res.insertId);
    const user = await get(res.insertId);
    user.primaryEmail = email;
    return user; 
}

const search = async q => await mysql.query(`SELECT id, FirstName, LastName, FROM Users WHERE LastName LIKE ? OR FirstName LIKE ?; `, [`%${q}%`, `%${q}%`]);

module.exports = {getAll,get,add,getTypes,search,update,remove,Types,register,login}

