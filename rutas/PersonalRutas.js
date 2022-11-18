const personalOperaciones = require("../operaciones/PersonalOperaciones");
const router = require("express").Router();

router.get("/", personalOperaciones.buscarPersonal);
router.get("/:id", personalOperaciones.buscarAgente);
router.post("/", personalOperaciones.crearPersonal);
router.put("/:id", personalOperaciones.modificarPersonal);
router.delete("/:id", personalOperaciones.eliminarPersonal);

module.exports = router;