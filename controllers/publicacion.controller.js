const { response, request } = require("express");
const  Publicacion  = require("../models/publicacion");

const publicacionGet = async (req = request, res = response) => {
  const { limit = 5, size = 0 } = req.query;

  const [total, publicaciones] = await Promise.all([
    Publicacion.countDocuments(),
    Publicacion.find()
      .limit(Number(limit))
      .skip(Number(size))
      .populate("usuario", "nombre"),
  ]);
  res.json({
    total,
    publicaciones,
  });
};

const publicacionGetId = async (req = request, res = response) => {
  const { id } = req.params;

  const publicacion = await Publicacion.findById(id).populate(
    "usuario",
    "nombre"
    );
    res.json({
        publicacion,
    });
};

const publicacionGetUid = (req = request, res = response) => {
  return res.status(201).json({
    msg: "get: mostar informacion",
  });
};

const publicacionPost = async (req = request, res = response) => {
  const data = {
    texto: req.body.texto,
    
  };

  const publicacion = new Publicacion(data);
  await publicacion.save();
  res.status(201).json({
    msg: "post: se guardo correctamente",
    publicacion,
  });
};

const publicacionPut = async (req = request, res = response) => {
  const { id } = req.params;
  
    const texto = req.body.texto

    const publicacion = await Publicacion.findByIdAndUpdate(id, { texto }, { new: true });
    res.status(201).json({
        msg: "put: se actualizo correctamente",
        publicacion,
    });
};


const publicacionDelete = async (req = request, res = response) => {
  
    const { id } = req.params;
  const publicacion = await Publicacion.findByIdAndDelete(id);
    res.status(201).json({
        msg: "delete: se elimino correctamente",
        publicacion,
    });

};

module.exports = {
  publicacionGet,
  publicacionPost,
  publicacionPut,
    publicacionDelete,
    publicacionGetId,
    publicacionGetUid
};
