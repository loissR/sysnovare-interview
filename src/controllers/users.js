const Boom = require("@hapi/boom")
const usersModel = require("../models/users")
const { errorTypes } = require("../utils/error")

/**
 * Controller - Register new user
 * @param {*} request - Request
 * @param {*} h - Response Toolkit
 * @returns 
 */
exports.subscribe = async (request, h) => {
    try {
        const { email, password } = request.payload 
        const user = await usersModel.get(email)
        if (user) {
            return Boom.conflict(errorTypes.DUPLICATE_ENTRY)
        }
        await usersModel.add(email, password)
        return h.response({ message: "User subscribed successfully" }).code(201)
    } catch (error) {
        console.log(error)
        return Boom.badImplementation()
    }
}

/**
 * Controller - Get current balance
 * @param {*} request - Request
 * @param {*} h - Response Toolkit
 * @returns 
 */
exports.getFunds = async (request, h) => {
    try {
        const { email } = request.auth.credentials
        const { balance } = await usersModel.get(email)
        return h.response({ balance })
    } catch (error) {
        console.log(error)
        return Boom.badImplementation()
    }
}

/**
 * Controller - Add funds
 * @param {*} request - Request
 * @param {*} h - Response Toolkit
 * @returns 
 */
exports.addFunds = async (request, h) => {
    try {
        const { email } = request.auth.credentials
        const { funds } = request.payload
        await usersModel.updateBalance(email, funds)
        return h.response({ message: "Funds successfully added" })
    } catch (error) {
        console.log(error)
        return Boom.badImplementation()
    }
}

/**
 * Controller - Remove funds
 * @param {*} request - Request
 * @param {*} h - Response Toolkit
 * @returns 
 */
exports.removeFunds = async (request, h) => {
    try {
        const { email } = request.auth.credentials
        const { funds } = request.payload
        await usersModel.updateBalance(email, funds * -1)
        return h.response({ message: "Funds successfully removed" })
    } catch (error) {
        console.log(error)
        return Boom.badImplementation()
    }
}

/**
 * Controller - Get list of movements
 * @param {*} request - Request
 * @param {*} h - Response Toolkit
 * @returns 
 */
exports.getMovements = async (request, h) => {
    try {
        const { email } = request.auth.credentials
        const { movements } = await usersModel.get(email)
        return h.response({ movements })
    } catch (error) {
        console.log(error)
        return Boom.badImplementation()
    }
}