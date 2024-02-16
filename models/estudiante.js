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
    curso1:{
        type:String,
        required:[true, "Es obligatorio tener 1 curso"]
    },
    curso2:{
        type:String,
        defaul:""
    },
    curso3:{
        type:String,
        defaul:""
    },
    rol:{
        type:String,
        
    },
    estado:{
        type:Boolean,
        default:true
    }
});

module.exports=model('Estudiante',EstudianteSchema);