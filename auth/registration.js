const {con} = require('../configs');
const bcrypt = require('bcrypt');
const hashedPass =  (pass)=>{
    return new Promise((resolve , reject)=>{
        bcrypt.hash(pass , 10 , (err , hashed)=>{
            if(err){
                reject(err);
                console.log('Error during hashed password');
            }
            resolve(hashed)
        })
    })
}

const studentRegister = async(req , res)=>{
    const {username , firstname , lastname , password} = req.body;
    const hashedPassword =  await hashedPass(password);
    con.query('select * from users where username  = ?',[username] , (err , result)=>{
        if(err){
            res.status(500).send('Error during check student query');
            console.error('Error during check student query');
            return;
        }
        if(result.length == 0){
            con.query(`insert into users 
                (username , firstname , lastname , password)
                 values (? , ? , ? , ?)`,
                 [username , firstname , lastname , hashedPassword]
                 ,(err)=>{
                    if(err){
                        res.status(400).send('Error with student register query');
                        return;
                    }
                    console.log('Student register successfuly');
                    res.status(200).send('Student register successfuly');
                 })
        }else{
            res.send('Username already registerd')
        }
    })
    
    
}

module.exports = studentRegister;