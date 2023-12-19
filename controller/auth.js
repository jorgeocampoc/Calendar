const express = require('express')
const bcrypt = require('bcryptjs') //se debe instalar el apquete bcrypt antes de usar
const User = require('../model/user_model');
const { user } = require('../routes/auth');
const {genJWT} = require('../helpers/jwt')
const createUser = async (req, res = express.response) => {

const {email, password} = req.body
    try {
        let user = await User.findOne({email})
        console.log(user);
        if( user !== null ){ 
            return res.status(400).json({
                ok:false,
                msg:'Email already exist'
            })
        }
        user =  new User( req.body)
        //encriptar contraseña
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync( password, salt )

        //save user
        await user.save()

        //generar jwt
        const token  = await genJWT(user.id, user.name)

        res.status(201).json({ 
        ok: true,
        uid:user.id,
        name: user.name,
        token
  

});
    } catch (error) {
        res.status(400).json({ 
            ok: false,
            msg:'server not respond' 
        });
        throw new Error('Error to save user')
        
    }
};


const login = async (req, res= express.response)=>{
    
    const { email, password } = req.body

    try{
        const user = await User.findOne({email});
        console.log(user);
        if( !user ){ 
            return res.status(400).json({
                ok:false,
                msg:'Invalid/password invalid'
            })
        }
        //verificar passwors
        const passwordCurrent = bcrypt.compareSync(password, user.password)
        if( !passwordCurrent ){
            return res.status(400).json({
                ok:false,
                msg:'Invalid/password invalid'
            })
        }
        //generar token
        const token  = await genJWT(user.id, user.name)
        res.json({
            ok:true,
            uid:user.id,
            name: user.name,
            token
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'server not respond'
        })

    }
  

   
}

const revalToken =  async(req, res)=>{
    const uid = req.uid;
    const name = req.name;
    const token = await genJWT(uid, name)
    res.json({
        ok:true,
        token
    })
}


module.exports = {
    createUser,
    login,
    revalToken
}
