const Joi = require('joi')

exports.subscribe = {
    payload: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(12).required()
    })
}

exports.addFunds = {
    payload: Joi.object({
        funds: Joi.number().positive().required()
    })
}

exports.removeFunds = {
    payload: Joi.object({
        funds: Joi.number().positive().required()
    })
}