const express = require('express')
const { validationResult } = require('express-validator');
// parallel processing
module.exports = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const erros = validationResult(req);
        if(erros.isEmpty()) {
            return next();
        }

        res.status(400).json({
            errors: erros.array()
        })
    }
}