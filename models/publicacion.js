const { Schema, model } = require('mongoose');

const PublicacionSchema = new Schema({
    texto: {
        type: String,
        required: [true, 'El texto es necesario']
    },
    imagen: {
        type: String,
        default: null
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es necesario']
    },
    fecha: {
        type: Date,
        default: Date.now()
    },
    comentarios: [{
        type: Schema.Types.ObjectId,
        ref: 'Comentario',
        default: null
    }],
    like: {
        type: Number,
        default: 0
    }
});

module.exports = model('Publicacion', PublicacionSchema);