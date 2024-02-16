const {Schema, model}=require('mongoose');

const EstudianteSchema=Schema({
    nombres:{
        type:String,
        required:[true, "Tus nombres son obligatorios"]
    },
    apellidos:{
        type:String,
        required:[true, "Los apellidos son obligarorios"]
    },
    correo:{
        type:String,
        required:[true, "El correo es obligatorio"]
    },
    grado:{
        type:String,
        required:[true,"El grado es requerido"]
    },
    edad:{
        type:Number,
        required:[true,"La edad es requerida"]
    },
    cantidadCursos:{
        type:Number,
        defaul:0
    },
    cursosAsignados:{
        type:String,
        default:""
    },
    estado:{
        type:Boolean,
        default:true
    }
});

module.exports=model('Estudiante',EstudianteSchema);