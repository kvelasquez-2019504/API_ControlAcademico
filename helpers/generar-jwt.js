const jwt = require('jsonwebtoken');

const generarJWT = (uid ='')=>{
    return new Promise((resolve,reject)=>{
        const payload={uid};
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn:"15h"
            },
            (err,token)=>{
                err?(console.log(err),reject('No se generó el token')):resolve(token);
            }
        )
    });
}

module.exports = {
    generarJWT
}