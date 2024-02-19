const {Router} = require('express');
const {verMisCursos,
    estudiantesDelete,
    estudiantesPut,
    asignarEstudianteACurso,
    estudiantesGet,
    estudiantesGetById,
    estudiantesPost} = require('../controllers/estudiante.controller');

const {existeCurso1,
    existeCurso2,
    existeCurso3,
    existeEmailEstudiante,
     existeEstudianteById} = require('../helpers/db-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {check} = require('express-validator');
 const router = Router();

router.get("/",estudiantesGet);

router.get("/:id",[
    check("id","El id no es un formato válido de MongoDB").isMongoId(),
    check("id").custom(existeEstudianteById),
    validarCampos
],estudiantesGetById);

router.get("/verCursos/:id",[
    check("id","El id no es un formato válido de MongoDB").isMongoId(),
    check("id").custom(existeEstudianteById),
    validarCampos
],verMisCursos);

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
 
router.put("/:id",[
    check("id","El id no es un formato válido de MongoDB").isMongoId(),
    check("id").custom(existeEstudianteById),
    check("curso1","Es obligatorio tener curso 1"),
    check("curso1").custom(existeCurso1),
    check("curso2","Pede elegir otro curso"),
    check("curso2").custom(existeCurso2),
    check("curso3","Pede elegir otro curso"),
    check("curso3").custom(existeCurso3),
    validarCampos
],asignarEstudianteACurso);

router.put("/actualizar/:id",[
    check("id","El id no es un formato válido de MongoDB").isMongoId(),
    check("id").custom(existeEstudianteById),
    check("nombres","Los nombres son obligatorios").not().isEmpty(),
    check("apellidos","Los apellidos son obligatorios").not().isEmpty(),
    check("edad","La edad es obligatoria").isNumeric(),
    validarCampos
],estudiantesPut);

router.delete("/delete/:id",[
    check("id","El id no es un formato válido de MongoDB").isMongoId(),
    check("id").custom(existeEstudianteById),
    validarCampos
],estudiantesDelete);

 module.exports = router;