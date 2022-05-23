const { response, request } = require("express");

const comentarioGet = (req = request, res = response) => {
  const query = req.query; //toma las query que se envio en la ruta
  const { limit = 5, size = 5, page = 1 } = req.query; //toma las query que se envio en la ruta

  res.status(201).json({
    msg: "get: mostar informacion",
    limit,
    size,
    page,
  });
};
const comentarioPost = (req = request, res = response) => {
  res.status(201).json({
    msg: "get: mostar informacion",
    limit,
    size,
    page,
  });
};
const comentarioPut = (req = request, res = response) => {
  res.status(201).json({
    msg: "get: mostar informacion",
    limit,
    size,
    page,
  });
};
const comentarioDelete = (req = request, res = response) => {
  res.status(201).json({
    msg: "get: mostar informacion",
    limit,
    size,
    page,
  });
};

module.exports = {
  comentarioGet,
  comentarioPost,
  comentarioPut,
  comentarioDelete,
};
