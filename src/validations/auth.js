const Joi = require('joi')

exports.login = {
    headers: Joi.object({
        authorization: Joi.required()
    }).options({ allowUnknown: true })
}