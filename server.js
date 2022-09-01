const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

//controllers
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//connecting 
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'Ejpewp0807',
    database : 'smart-brain'
  }
});

//
const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req,res) => {res.send("it is working")});
app.post('/signin', (req, res) => {signIn.handleSignIn(req, res, db, bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});	
app.get('/profile/:id',(req, res) => {profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req,res)});


// const DATABASE_URL = process.env.DATABASE_URL
app.listen(process.env.PORT || 3001, ()=> {
	console.log(`app is running on port 3001`);
});




