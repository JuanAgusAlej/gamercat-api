const { response, request } = require("express");
const {publicacion} = require('../models/publicacion')

const publicacionGet = (req = request, res = response) => {
  return res.status(201).json({
    msg: "get: mostar informacion",
  });
};
const publicacionGetId = (req = request, res = response) => {
  return res.status(201).json({
    msg: "get: mostar informacion",
  });
};
const publicacionGetUid = (req = request, res = response) => {
  return res.status(201).json({
    msg: "get: mostar informacion",
  });
};
const publicacionPost = (req = request, res = response) => {
  return res.status(201).json({
    msg: "get: mostar informacion",
  });
};
const publicacionPut = (req = request, res = response) => {
  return res.status(201).json({
    msg: "get: mostar informacion",
  });
};
const publicacionDelete = (req = request, res = response) => {
  return res.status(201).json({
    msg: "get: mostar informacion",
  });
};

module.exports = {
  publicacionGet,
  publicacionPost,
  publicacionPut,
    publicacionDelete,
    publicacionGetId,
    publicacionGetUid
};
