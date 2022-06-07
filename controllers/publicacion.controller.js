const { response, request } = require("express");

const Publicacion = require("../models/publicacion");

const publicacionGet = async (req = request, res = response) => {
  const { limit = 5, size = 0 } = req.query;
  const {id} = req.params;

  if (!id) {
    const [total, publicaciones] = await Promise.all([
      Publicacion.countDocuments(),
      Publicacion.find()
        .limit(Number(limit))
        .skip(Number(size))
        .populate("usuario", "nombre avatar")
        .populate("comentarios", "descripcion usuario like"),
    ]);
    res.json({
      total,
      publicaciones,
    });
  } else if (id) {
    const idUbicado = req.idUbicado;

    switch (idUbicado) {
      case "publicacion":
        const publicacionId = await Publicacion.findById(id)
          .populate("usuario", "nombre")
          .populate("comentarios", "descripcion usuario like");

        res.json({
          publicacionId,
        });
        break;

      case "usuario":
        const query = { usuario: id };

        const [total, publicaciones] = await Promise.all([
          Publicacion.countDocuments(query),
          Publicacion.find(query)
            .limit(Number(limit))
            .skip(Number(size))
            .populate("usuario", "nombre")
            .populate("comentarios", "descripcion usuario like"),
        ]);

        res.json({
          total,
          publicaciones,
        });
        break;

      default:
        res.status(404).json({
          ok: false,
          msg: "El id no es valido",
        });
        break;
    }
  }
};

const publicacionPost = async (req = request, res = response) => {
  const data = {
    texto: req.body.texto,
    usuario: req.usuario._id,
  };
  if (req.body.imagen) data.imagen = req.body.imagen;

  const publicacion = new Publicacion(data);
  await publicacion.save();
  res.status(201).json({
    msg: "post: se guardo correctamente",
    publicacion,
  });
};

const publicacionPut = async (req = request, res = response) => {
  const { id } = req.params;

  // const likeController = await like(id, req.uid, req.like, req.publicacion);

  // const publicacionActualizada = await Publicacion.findByIdAndUpdate(
  //   id,
  //   likeController,
  //   { new: true }
  // );
  // res.status(201).json({
  //   msg: "Modifico el like",
  //   publicacionActualizada,
  // });
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
};
