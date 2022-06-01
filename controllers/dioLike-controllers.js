
const Publicacion = require('../models/publicacion');

const like = async (id, usid, dioLike) => {
      
  const publicacion = await Publicacion.findById(id);

  if (dioLike) {
    const sacarLike = publicacion.like.filter((uid) => uid != usid);
    publicacion.like = sacarLike;
  } else {
    publicacion.like.push(usid);
    }
    
    return publicacion

}

module.exports = {
    like
}