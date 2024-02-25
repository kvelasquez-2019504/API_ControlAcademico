const {Router} = require('express');
const {cursosDelete,
    cursosPut,
    cursosPost,
    cursosGetById,
    existeCursoMaestro} = require('../controllers/curso.controller');
const {validarCampos}=require('../middlewares/validar-campos');
const {existeCursoById,validarNombreCurso} = require('../helpers/db-validator');
const {check} =require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRol } = require('../middlewares/validar-roles');
const { verMisCursos } = require('../controllers/maestro.controller');
const router = Router();

router.get('/', [
    validarJWT,
    tieneRol('TEACHER_ROLE'),
    validarCampos
], verMisCursos);

router.get("/:idCurso",[
    validarJWT,
    tieneRol('TEACHER_ROLE'),
    check("idCurso","El id no corresponde a un ID de Mongo").isMongoId(),
    check("idCurso").custom(existeCursoById),
    validarCampos,
    existeCursoMaestro
],cursosGetById);

router.post('/', [
    validarJWT,
    tieneRol('TEACHER_ROLE'),
    check("nombre","El nombre de la materia es obligatorio").not().isEmpty(),
    check("nombre").custom(validarNombreCurso),
    validarCampos
],cursosPost);

router.put("/:id",[
    validarJWT,
    tieneRol('TEACHER_ROLE'),
    check("id","El id no corresponde a un ID de Mongo").isMongoId(),
    check("id").custom(existeCursoById),
    validarCampos
],cursosPut);

router.delete("/:id",[
    validarJWT,
    tieneRol('TEACHER_ROLE'),
    check("id","El id no corresponde a un ID de Mongo").isMongoId(),
    check("id").custom(existeCursoById),
    validarCampos
],cursosDelete);

module.exports =router;