const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  //   const query = req.query; //toma las query que se envio en la ruta
  const { limit = 5, nombre = "Sin Nombre", apikey, page = 1 } = req.query; //toma las query que se envio en la ruta

  res.status(201).json({
    msg: "get: mostar informacion",
    limit,
    nombre,
    apikey,
    page,
  });
};

const usuariosPost = (req = request, res = response) => {
  const dato = req.body; //toma los datos que se envian

  res.json({
    msg: "post: crear informacion",
    dato,
  });
};

const usuariosPut = (req = request, res = response) => {
  const id = req.params.id; //toma el parametro que se envio en la ruta

  res.json({
    msg: "put: actualizar informacion",
    id,
  });
};

const usuariosDelete = (req = request, res = response) => {
  const id = req.params.id;
  res.json({
    msg: "delete: eliminar informacion",
    id,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
