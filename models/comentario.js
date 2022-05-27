const { Schema, model } = require('mongoose');

const ComentarioSchema = new Schema({ 
    descripcion: {
        type: String,
        required: [true, 'La descripcion es necesaria']
    },
    usuario: {
        type: Schema.Types.ObjectId,

    },
    publicacion: {
        type: Schema.Types.ObjectId,
    },
    fecha: {
        type: Date,
        default: Date.now()
    },
    like: {
        type: Number,
        default: 0
    }

})
ComentarioSchema.methods.toJSON = function () {
    const { __v, ...resto } = this.toObject();
    return resto;
  };
module.exports = model('Comentario', ComentarioSchema);