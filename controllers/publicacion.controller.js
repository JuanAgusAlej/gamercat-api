const { response, request } = require("express");
const {check} = require('express-validator');
const { publicacionExiste, existeId } = require("../helpers/db-validators-publicacion");
const { validarCampos } = require("../middlewares/validar-campos");
const  Publicacion  = require("../models/publicacion");
const { like } = require("./dioLike-controllers");

const publicacionGet = async (req = request, res = response) => {
  const { limit = 5, size = 0, id, uid } = req.query;

  if (!id && !uid) {
  
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
    
  
   
    const publicacionId = await Publicacion.findById(id).populate("usuario", "nombre")
    .populate("comentarios", "descripcion usuario like");
      
      
      res.json({
        publicacionId,
      });

  } else {
    const query = { usuario: uid }
    

    const [total, publicaciones] =await Promise.all([
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
  }



};





const publicacionPost = async (req = request, res = response) => {
  const data = {
    texto: req.body.texto,
    usuario:req.usuario._id
  };
  if(req.body.imagen) data.imagen = req.body.imagen 

  const publicacion = new Publicacion(data);
  await publicacion.save();
  res.status(201).json({
    msg: "post: se guardo correctamente",
    publicacion,
  });
};

const publicacionPut = async (req = request, res = response) => {
  const { id } = req.params;
 
  const likeController = await like(id, req.uid, req.like, req.publicacion);


  const publicacionActualizada = await Publicacion.findByIdAndUpdate(
    id,
    likeController,
    { new: true }
  );
  res.status(201).json({
    msg: "Modifico el like",
    publicacionActualizada,
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
    
};
