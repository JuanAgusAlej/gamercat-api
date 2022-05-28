const Publicacion = require('../models/publicacion');

const publicacionExiste = async (id) => { 
    const publicacion = await Publicacion.findById(id);
    if (!publicacion) {
        throw new Error('Publicacion no existe');
    }

}
const existeId = async (id) => {
    const publicacion = await Publicacion.findById(id);
    if (!publicacion) {
        const publicacionUid = await Publicacion.find({ usuario: id });
        if (!publicacionUid) {
            throw new Error('Publicacion no existe');
        }
        
    }
}

module.exports = {
    publicacionExiste,
    existeId
}