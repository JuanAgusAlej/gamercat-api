const { response, request } = require("express");
const Comentario = require("../models/comentario");
const Publicacion = require("../models/publicacion");

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
  
  const userid = req.usuario._id
  
  const comentario = await Comentario.findById(id)


  const dioLik = await comentario.like.includes(uid => 
         uid === userid
  );

  console.log(dioLik);
  if (dioLik) {
    comentario.like.splice(comentario.like.indexOf(uid => uid === userid), 1);
    console.log("diolik")
  } else {
    comentario.like.push(userid);
  }

  
    const comentarioActualizada = await Comentario.findByIdAndUpdate(id, comentario, { new: true });
    res.status(201).json({
        msg: "put: se actualizo correctamente",
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
