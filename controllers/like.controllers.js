const { request, response } = require('express');
const Comentario = require('../models/comentario');
const Publicacion = require('../models/publicacion');

const like = async (req = request, res = response) => {
    const { id } = req.params;

  //const likeController = await like(id, req.uid, req.like, req.publicacion);

  
  if (req.publicacion) {
      const buscarLike = await Publicacion.findById(id);
      
      if (req.like) {
        const sacarLike = buscarLike.like.filter((uid) => uid != req.uid);
        buscarLike.like = sacarLike;
      } else {
        buscarLike.like.push(req.uid);
        }
          
          
        const publicacionActualizada = await Publicacion.findByIdAndUpdate(
          id,
          buscarLike,
          { new: true }
        );
        res.status(201).json({
          msg: "Modifico el like",
          publicacionActualizada,
        });
    } else {
        const buscarLike = await Comentario.findById(id);
        
        if (req.like) {
          const sacarLike = buscarLike.like.filter((uid) => uid != req.uid);
          buscarLike.like = sacarLike;
        } else {
          buscarLike.like.push(req.uid);
          }
            
            
          const publicacionActualizada = await Comentario.findByIdAndUpdate(
            id,
            buscarLike,
            { new: true }
          );
          res.status(201).json({
            msg: "Modifico el like",
            publicacionActualizada,
          });
      
  } 
  
};

module.exports = {
    like,
};