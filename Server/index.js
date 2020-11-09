const express = require('express');
const path = require('path');
require('dotenv').config();

const users = require('./controllers/users');

console.log(process.env.BEST_CLASS);

//Middleware
const app = express()
const port = process.env.PORT || 3000;


//Authentication / Authorization
app.use(express.json());
app.use("/",express.static(__dirname + '/../docs/'));


//API
app.get('/', (req, res, next) => {
  res.send('Hello World, you requested ' + req.url)
})

app.use('/users', users);

app.get('*', (req, res, next) => {
  const filename = path.join( __dirname + '/../docs/index.html');
  console.log(filename);
  res.sendFile(filename);
})

app.use(function(req,res,next){
  const arr = (req.headers.authorization || "").split(" ");
  if(arr.length > 1 && arr[1] != NULL){
    req.usrId = +arr[1];
  }
  next(); 
});

app.use( (err,req,res,next) =>{
  console.log(err);
  res.status(er.status ||500).send({message: err.message})
});

//Init
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})