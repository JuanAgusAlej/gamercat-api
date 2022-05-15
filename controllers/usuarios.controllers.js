const {response, request} = require('express');

const usuariosGet = (req = request, res = response) => {
    
    const query = req.query;//toma las query que se envio en la ruta
    const {limit=5, size=5, page=1}= req.query;//toma las query que se envio en la ruta


    res.status(201).json({
        msg: 'get: mostar informacion',
        limit,
        size,
        page,
    });
}

const usuariosPost = (req = request, res = response) => {
    const dato = req.body;//toma los datos que se envian

    res.json({
        msg: 'post: crear informacion',
        dato
    });
}

const usuariosPut = (req = request, res = response) => {
    
    const id = req.params.id;//toma el parametro que se envio en la ruta

    res.json({
        msg: 'put: actualizar informacion'
    });
}

const usuariosDelete =(req=request, res=response) => {
    res.json({
        msg: 'delete: eliminar informacion'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}