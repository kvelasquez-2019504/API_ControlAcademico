const { Router } = require('express');
const {maestrosPost, maestrosGet } = require('../controllers/maestro.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const router = Router();

router.get('/', maestrosGet);

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
