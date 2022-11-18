const LoginClienteOperaciones = require ("../operaciones/LoginClienteOperaciones");
const router = require('express').Router();

router.post("/", LoginClienteOperaciones.login);

module.exports = router