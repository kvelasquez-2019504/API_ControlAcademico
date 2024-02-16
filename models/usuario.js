const {Schema, model}=require("mongoose");

const UsuarioSchema = Schema({
    nombreUsuario:{
        type:String,
        required:[true, "El nombre de usuario es obligatorio"]
    },
    correoUsuario:{
        type:String,
        required:[true, "El correo es obligatorio"]
    },
    claveUsuario:{
        type:String,
        required:[true, "La clave es obligatoria por seguridad"]
    },
    estado:{
        type:String,
        default:true
    }
});

module.exports = model("Usuario",UsuarioSchema);