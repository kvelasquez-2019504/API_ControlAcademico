const {Router} = require('express');
const {estudiantesGet,estudiantesPost} = require('../controllers/estudiante.controller');
const {existeEmailEstudiante} = require('../helpers/db-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {check} = require('express-validator');
 const router = Router();

router.get("/",estudiantesGet);
router.post("/", [
    check("nombres","Los nombres son obligatorios").not().isEmpty(),
    check("apellidos","Los apellidos son obligatorios").not().isEmpty(),
    check("correo","El correo es obligatorio").isEmail(),
    check("correo").custom(existeEmailEstudiante),
    check("grado","El grado es obligatorio").not().isEmpty(),
    check("edad","La edad es obligatoria").isNumeric(),
    check("curso1","Es obligatorio tener curso 1").not().isEmpty(),
    check("curso2","Pede elegir otro curso"),
    check("curso3","Pede elegir otro curso"),
    validarCampos
],estudiantesPost);
 
 module.exports = router;