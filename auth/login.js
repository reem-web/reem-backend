const {con} = require('../configs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'schoolm';

const studentLogin = (req , res)=>{
    const {username , password} = req.body;
    const token = jwt.sign({username , password} , secretKey , {expiresIn:'1h'})
    con.query('select * from users where username = ?' , [username],(err ,result)=>{
        const data = result
        if(err){
            res.status(400).send('Error with student login query');
            return;
        }
        if(result.length == 0){
            res.status(401).send('username not exist')
        }else{
            bcrypt.compare(password , result[0].password , (err , result)=>{
                if(err)throw err;

                if(result){
                    res.status(200).send({
                        "firstname":data[0].firstname,
                        "lastname":data[0].lastname,
                        token
                    })
                }else{
                    res.status(403).send('password error')
                }
            })
        }
    })

}

module.exports = studentLogin;