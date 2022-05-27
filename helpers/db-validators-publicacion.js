const Publicacion = require('../models/publicacion');

const publicacionExiste = async (id) => { 
    const publicacion = await Publicacion.findById(id);
    if (!publicacion) {
        throw new Error('Publicacion no existe');
    }

}

module.exports = {
    publicacionExiste,
}