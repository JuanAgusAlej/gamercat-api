const { Schema, model } = require("mongoose");

const AboutUseSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es necesario"],
  },
  email: {
    type: String,
    required: [true, "El correo es necesario"],
  },
  linkedin: {
    type: String,
  },
  imagen: {
    type: String,
    required: [true, "La imagen es necesaria"],
  },
  skill: [
    {
      type: String,
      required: [true, "La habilidad es necesaria"],
    }
  ],
  contratado: {
    type: Boolean,
    default: true,
  },
});

AboutUseSchema.methods.toJSON = function () {
  const { __v, contratado, ...aboutUse } = this.toObject();
  return aboutUse;
};

module.exports = model("AboutUse", AboutUseSchema);
