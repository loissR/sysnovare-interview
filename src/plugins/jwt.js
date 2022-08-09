const config = require("../config")
const usersModel = require("../models/users")

const { secret } = config.jwt

/**
 * Validate jwt decoded payload
 * @param {*} decoded
 * @returns 
 */
const validate = async (decoded) => {
    const email = decoded.user
    const user = await usersModel.get(email)
    if (user) {
        return ({
            isValid: true,
            credentials: { email }
        })
    }
    return ({ isValid: false })
}

module.exports = {
    key: secret,
    validate,
    verifyOptions: { 
        algorithms: ["HS256"] 
    }
}