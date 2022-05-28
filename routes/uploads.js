const { Router } = require("express");

const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

//Para validar si viene el archivo
const { validarArchivo } = require("../middlewares/validar-archivos");

//middleware creado por mi para validar la extensión del archivo
const { validarExtension } = require("../middlewares/validar-extension");

//Controlador que permite subir la imagen
const { actualizarImagenCloudinary } = require("../controllers/uploads");

//Validar colecciones permitidas (usuarios, productos) para guardar la imagen
const { coleccionesPermitidas } = require("../helpers/db-validators");

const router = Router();

router.put(
  "/:coleccion/:id",
  [
    validarArchivo,
    validarExtension,
    check("id", "El id debe ser de mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  actualizarImagenCloudinary
  // actualizarImagen
);

module.exports = router;
