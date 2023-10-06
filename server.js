const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const {con, checkConnectDB , checkServerStarted} = require('./configs');
const studentLogin = require('./auth/login');
const studentRegister = require('./auth/registration');


const app = express();
app.use(bodyParser.json());
app.use(cors());


con.connect(checkConnectDB);


app.post('/register/student' , studentRegister)
app.post('/login/student' , studentLogin)


app.listen(3000 , checkServerStarted)




