const {Router} = require('express');
const {validarCampos}=require('../middlewares/validar-campos');
const {check} = require('express-validator');
const {estudiantesGet,estudiantesPost} =require('../controllers/estudiante.controller');
const {verificarIdCursos,
    cantidadDeCursos,
    existeEmailEstudiante} = require('../helpers/db-validator');
const router = new Router();

router.get('/',estudiantesGet);

router.post('/',[
    check("nombres", "Los nombres son obligatorios").not().isEmpty(),
    check("apellidos","Los apellidos son obligatorios").not().isEmpty(),
    check("correo","El correo es obligatorio").isEmail(),
    check("correo").custom(existeEmailEstudiante),
    check("password","La contraseña es obligatoria y mayor a 6 caracteres").isLength({min:6}),
    //check("cursos","Solo te puedes asignar a 3 cursos").isArray().isLength({min:3}),
    check("cursos","Debe ingresar los ID en forma de Array").isArray(),
    check("cursos","El ID de curso no es de Mongo").isMongoId(),
    check("cursos").custom(cantidadDeCursos), 
    check("cursos").custom(verificarIdCursos), 
    validarCampos
],estudiantesPost);

module.exports = router;