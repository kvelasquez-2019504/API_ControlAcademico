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
    password:{
        type:String, 
        required:[true, "El password es obligatorio"]
    },
    cursos:{
        type:Array,
        default:[]
    },
    rol:{
        type:String,
        default:"STUDENT_ROLE"
    },
    estado:{
        type:Boolean,
        default:true
    }
});

module.exports=model('Estudiante',EstudianteSchema);