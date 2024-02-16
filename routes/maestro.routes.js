const { Router } = require('express');
const { maestrosPut, maestrosPost, maestrosGet } = require('../controllers/maestro.controller');
const {existenteEmailMaestro,existenciaMaestroById,
     existeEstudianteById} = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const router = Router();

router.get('/', maestrosGet);

router.put('/:id', [
    check("id","El id no es un formato válido de MongoDB").isMongoId(),
    check("id").custom(existenciaMaestroById),
    check("nombres","Los nombres son obligatorios").not().isEmpty(),
    check("apellidos","Los apellidos son obligatorios").not().isEmpty(),
    check("correo","El correo es obligatorio").isEmail(),
    check("correo").custom(existenteEmailMaestro),
    check("grado", "El grado es obligatorio").not().isEmpty(),
    check("edad", "La edad es obligatoria").isNumeric(),
    check("cursos"),
    validarCampos
], maestrosPut);

router.post(
    "/", [
    check("nombres").not().isEmpty(),
    check("apellidos").not().isEmpty(),
    check("correo").isEmail(),
    check("grado", "El grado es obligatorio").not().isEmpty(),
    check("edad", "La edad es obligatoria").isNumeric(),
    check("cursos"),
    validarCampos
], maestrosPost)

module.exports = router;
