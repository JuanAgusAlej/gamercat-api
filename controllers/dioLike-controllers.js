
const Comentario = require('../models/comentario');
const Publicacion = require('../models/publicacion');

const like = async (id, usid, dioLike, likePublicacion) => {
  
    let buscarLike
    if (likePublicacion) {
        buscarLike = await Publicacion.findById(id);
        
    } else {
        buscarLike = await Comentario.findById(id);
        
    } 
    
    console.log(dioLike)
  if (dioLike) {
    const sacarLike = buscarLike.like.filter((uid) => uid != usid);
    buscarLike.like = sacarLike;
  } else {
    buscarLike.like.push(usid);
    }
    
    return buscarLike

}

module.exports = {
    like
}