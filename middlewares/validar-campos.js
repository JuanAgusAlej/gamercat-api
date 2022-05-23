const {validationResult} = require('express-validator');


const validarCampos = (req, res, next) => {
    //recibir respuesta del check
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    next();
}

module.exports = {
    validarCampos
}