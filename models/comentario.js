const { Schema, model } = require('mongoose');

const ComentarioSchema = new Schema({ 
    descripcion: {
        type: String,
        required: [true, 'La descripcion es necesaria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es necesario']

    },
    publicacion: {
        type: Schema.Types.ObjectId,
        ref: 'Publicacion',
        required: [true, 'La publicacion es necesaria']
    },
    fecha: {
        type: Date,
        default: Date.now()
    },
   
    like: 
        [{
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            default: null
        }]

})
ComentarioSchema.methods.toJSON = function () {
    const { __v, ...resto } = this.toObject();
    return resto;
  };
module.exports = model('Comentario', ComentarioSchema);