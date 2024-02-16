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
    rol:{
        type:String,
        required:[true, "El Rol es obligatorio"]
    },
    estado:{
        type:String,
        default:true
    }
});

module.exports = model("Usuario",UsuarioSchema);