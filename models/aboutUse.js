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
});

AboutUseSchema.method.toJSON = function () {
  const { __v, ...aboutUse } = this.toObject();
  return aboutUse;
};

module.exports = model("AboutUse", AboutUseSchema);
