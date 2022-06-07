const {Router } = require('express');
const { check } = require('express-validator');
const { like } = require('../controllers/like.controllers');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { dioLike } = require('../middlewares/validar-like');

const router = Router();

router.post('/:id', [
    validarJWT,
  check('id', 'El id no es valido').isMongoId(),
  dioLike,
    validarCampos
], like);

module.exports = router;