const { request, response } = require("express");

const extensionesValidas = ["png", "jpg", "jpeg", "gif"];

const validarExtension = (req = request, res = response, next) => {
  //Validar imagenes-----------------------------------
  let files = req.files;
  const { archivo } = files; //obtengo el archivo
  const nombreCortado = archivo.name.split("."); //obtener la extensión separando por el punto
  const extension = nombreCortado[nombreCortado.length - 1]; //la última posición es la extensión
  //validar la extensión
  if (!extensionesValidas.includes(extension)) {
    return res.status(400).json({
      msg: `La extensión ${extension} no es permitida , ${extensionesValidas}`,
    });
  }

  next();

  //----------------------------------------------------
};

module.exports = {
  validarExtension,
};
