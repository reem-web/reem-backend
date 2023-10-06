const mysql = require('mysql');
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'2468',
    port:3306,
    database:'schoolm'
})

const checkConnectDB = (err)=>{
    if(err){
        res.status(500).send('Internet server errpr');
        return;
    }
    console.log('Connected succesful with mysal DB')
}




const checkServerStarted = ()=>{
    console.log('Server Started on PORT: 3000')
}

module.exports = {
    con,
    checkConnectDB,
    checkServerStarted
}