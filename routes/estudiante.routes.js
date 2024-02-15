const {Router} = require('express');
const {estudiantesGet} = require('../controllers/estudiante.controller');
 const router = Router();
 router.get("/",estudiantesGet);
 module.exports = router;