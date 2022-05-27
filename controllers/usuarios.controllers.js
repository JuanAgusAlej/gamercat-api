const { response, request } = require("express");
const Usuario = require("../models/usuarios");
const bcryptjs = require("bcryptjs");

const usuariosGet = async (req = request, res = response) => {
  //   const query = req.query; //toma las query que se envio en la ruta
  const { limite = 5, desde = 0 } = req.query; //toma las query que se envio en la ruta

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(),
    Usuario.find().skip(Number(desde)).limit(Number(limite)),
  ]);

  res.status(201).json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req = request, res = response) => {
  const dato = req.body; //toma los datos que se envian

  const { nombre, correo, password, rol } = dato;

  const usuario = new Usuario({ nombre, correo, password, rol });

  //encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //guardar datos en la BD
  await usuario.save();

  res.json({
    usuario,
  });
};

const usuariosPut = async (req = request, res = response) => {
  const id = req.params.id; //toma el parametro que se envio en la ruta
  const { password, correo, google, ...resto } = req.body;

  //validar password contra la bd
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  //actualizar los datos
  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    usuario,
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
