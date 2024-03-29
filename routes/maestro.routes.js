const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const { verificarCursosRepetidos,
    verificarIdCursos,
    cantidadDeCursos,
    existenteEmailMaestro } = require('../helpers/db-validator');
const {validarJWT} = require('../middlewares/validar-jwt');
const {tieneRol}=require('../middlewares/validar-roles');
const { maestrosPost, maestrosPut } = require('../controllers/maestro.controller');
const router = new Router();

router.put('/',[
    validarJWT,
    tieneRol('TEACHER_ROLE'),
    check("nombres", "Los nombres son obligatorios").not().isEmpty(),
    check("apellidos","Los apellidos son obligatorios").not().isEmpty(),
    check("password","La contraseña es obligatoria y mayor a 6 caracteres").isLength({min:6}),
    check("cursos","Debe ingresar los ID en forma de Array").isArray(),
    check("cursos").custom(cantidadDeCursos), 
    check("cursos","El ID de curso no es de Mongo").isMongoId(),
    check("cursos").custom(verificarIdCursos),
    check("cursos").custom(verificarCursosRepetidos), 
    validarCampos
],maestrosPut);

router.post('/', [
    check("nombres", "Los nombres son obligatorios").not().isEmpty(),
    check("apellidos", "Los apellidos son obligatorios").not().isEmpty(),
    check("correo", "El correo es obligatorio").isEmail(),
    check("correo").custom(existenteEmailMaestro),
    check("password", "La contraseña es obligatoria y mayor a 6 caracteres").isLength({ min: 6 }),
    check("cursos", "Debe ingresar los ID en forma de Array").isArray(),
    check("cursos").custom(cantidadDeCursos),
    check("cursos", "El ID de curso no es de Mongo").isMongoId(),
    check("cursos").custom(verificarIdCursos),
    check("cursos").custom(verificarCursosRepetidos),
    validarCampos
], maestrosPost);

module.exports = router;