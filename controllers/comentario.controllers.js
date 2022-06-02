const { response, request } = require("express");
const Comentario = require("../models/comentario");
const Publicacion = require("../models/publicacion");
const { like } = require("./dioLike-controllers");

const comentarioGet = (req = request, res = response) => {
   
  

};
const comentarioPost = async (req = request, res = response) => {
  
const { idPost} = req.params;

  const publicacion = await Publicacion.findById(idPost)


  const data = {
    descripcion: req.body.descripcion,
    usuario: req.usuario._id,
    publicacion: idPost
  };
  
  const comentario = new Comentario(data);
  await comentario.save();
  
  publicacion.comentarios.push(comentario._id)
  
  await Publicacion.findByIdAndUpdate(idPost, publicacion);

  res.status(201).json({
    msg: "post: se guardo correctamente",
    comentario,
  });


  
};
const comentarioPut = async (req = request, res = response) => {

  const { id } = req.params;
 
  const likeController = await like(id, req.uid, req.like, req.publicacion);


  const comentarioActualizada = await Comentario.findByIdAndUpdate(
    id,
    likeController,
    { new: true }
  );
  res.status(201).json({
    msg: "Modifico el like",
    comentarioActualizada,
  });
};
const comentarioDelete = async (req = request, res = response) => {
  
  const { id } = req.query;
  


 const comentario = await Comentario.findByIdAndDelete(id);
  
  res.status(201).json({
    msg: "Se borro el comentario",
    comentario
  });
};

module.exports = {
  comentarioGet,
  comentarioPost,
  comentarioPut,
  comentarioDelete,
};
