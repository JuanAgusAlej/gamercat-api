const { Schema, model } = require('mongoose');

const PublicacionSchema = new Schema({
    texto: {
        type: String,
        default: null,
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
    },],
    like: 
        [{
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            default: null
        }]
    
});
PublicacionSchema.methods.toJSON = function () {
    const { __v, ...resto } = this.toObject();
    return resto;
  };

module.exports = model('Publicacion', PublicacionSchema);