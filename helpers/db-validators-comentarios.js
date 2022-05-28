const Comentario = require('../models/comentario');

const comentarioExiste = async (id) => { 
    const comentario = await Comentario.findById(id);
    if (!comentario) {
        throw new Error('comentario no existe');
    }

}

module.exports = {
    comentarioExiste,
}