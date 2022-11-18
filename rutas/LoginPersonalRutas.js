const LoginPersonalOperaciones = require ("../operaciones/LoginPersonalOperaciones");
const router = require('express').Router();

router.post("/", LoginPersonalOperaciones.login);

module.exports = router