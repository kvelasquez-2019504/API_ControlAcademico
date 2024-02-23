const {Router} = require('express');
const {validarCampos}=require('../middlewares/validar-campos');
const {check} = require('express-validator');
const {verMisCursos,estudiantesPut,
    estudiantesPost} =require('../controllers/estudiante.controller');
const {verificarCursosRepetidos,
    verificarIdCursos,
    cantidadDeCursos,
    existeEmailEstudiante,
    existeEstudianteById} = require('../helpers/db-validator');
const router = new Router();

router.get('/:id',[
    check("id","El ID debe ser de MongoDB").isMongoId(),
    check("id").custom(existeEstudianteById),
    validarCampos
],verMisCursos);

router.put('/:id',[
    check("nombres", "Los nombres son obligatorios").not().isEmpty(),
    check("apellidos","Los apellidos son obligatorios").not().isEmpty(),
    check("password","La contraseña es obligatoria y mayor a 6 caracteres").isLength({min:6}),
    check("cursos","Debe ingresar los ID en forma de Array").isArray(),
    check("cursos").custom(cantidadDeCursos), 
    check("cursos","El ID de curso no es de Mongo").isMongoId(),
    check("cursos").custom(verificarIdCursos),
    check("cursos").custom(verificarCursosRepetidos), 
    validarCampos
],estudiantesPut);

router.post('/',[
    check("nombres", "Los nombres son obligatorios").not().isEmpty(),
    check("apellidos","Los apellidos son obligatorios").not().isEmpty(),
    check("correo","El correo es obligatorio").isEmail(),
    check("correo").custom(existeEmailEstudiante),
    check("password","La contraseña es obligatoria y mayor a 6 caracteres").isLength({min:6}),
    check("cursos","Debe ingresar los ID en forma de Array").isArray(),
    check("cursos").custom(cantidadDeCursos), 
    check("cursos","El ID de curso no es de Mongo").isMongoId(),
    check("cursos").custom(verificarIdCursos),
    check("cursos").custom(verificarCursosRepetidos), 
    validarCampos
],estudiantesPost);

module.exports = router;