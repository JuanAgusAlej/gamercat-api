const { response, request } = require("express");

const publicacionGet = (req = request, res = response) => {
  return response.status(201).json({
    msg: "get: mostar informacion",
  });
};
const publicacionPost = (req = request, res = response) => {
  return response.status(201).json({
    msg: "get: mostar informacion",
  });
};
const publicacionPut = (req = request, res = response) => {
  return response.status(201).json({
    msg: "get: mostar informacion",
  });
};
const publicacionDelete = (req = request, res = response) => {
  return response.status(201).json({
    msg: "get: mostar informacion",
  });
};

module.exports = {
  publicacionGet,
  publicacionPost,
  publicacionPut,
  publicacionDelete,
};
