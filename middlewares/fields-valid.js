const {response} = require('express');
const { validationResult } = require('express-validator')

// si todop se ejecuta normalmente se llama a la funcion next
const filedValid = (req, res = response, next) =>{

     //error hhanlde
     const error = validationResult(req);
    if( !error.isEmpty()){
        return res.status(400).json({
            ok:false,
            error:error.mapped()
        })
    }
    next()
}
module.exports = {
    filedValid
}