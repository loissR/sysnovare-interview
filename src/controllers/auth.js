const Boom = require("@hapi/boom")
const usersModel = require("../models/users")
const crypto = require("../utils/crypto")
const { errorTypes } = require("../utils/error")

/**
 * Controller - Check user credentials and create JsonWebToken
 * @param {*} request - Request
 * @param {*} h - Response Toolkit
 * @returns 
 */
exports.login = async (request, h) => {
    const { authorization } = request.headers
    const [ email, password ] = crypto.base64Decode(authorization.split(" ")[1]).split(":")
    const user = await usersModel.get(email)
    if (!user || user?.password !== crypto.sha256(password)) {
        return Boom.unauthorized(errorTypes.INVALID_CREDENTIALS)
    }
    const token = crypto.jwt({ user: email })
    return h.response({ token })
}