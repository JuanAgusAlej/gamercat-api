const { response, request } = require("express");
const Usuario = require("../models/usuarios");
const bcryptjs = require("bcryptjs");
//==========================GET
const usuariosGet = async (req = request, res = response) => {
  //   const query = req.query; //toma las query que se envio en la ruta
  const { limite = 5, desde = 0 } = req.query; //toma las query que se envio en la ruta
  const query = { estado: true };
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.status(201).json({
    total,
    usuarios,
  });
};
//============================POST
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
//===============================PUT
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
//==================================DELETE
const usuarioDelete = async (req, res) => {
  const id = req.params.id;

  //Eliminar fisicamente el registro
  // const usuarioBorrado = await Usuario.findByIdAndDelete(id);

  //Inactivar el registro

  const usuarioBorrado = await Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    usuarioBorrado,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuarioDelete,
};
