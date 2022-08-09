const crypto = require("crypto")
const jsonwebtoken = require("jsonwebtoken")
const config = require("../config")

const { secret, expiresIn } = config.jwt

/**
 * SHA256 hash
 * @param {string} message - Messege to be hashed
 * @returns 
 */
exports.sha256 = (message) => crypto.createHash("sha256").update(message).digest("hex")

/**
 * Base64 decode
 * @param {*} encodedMessage - Message to be decoded
 * @returns 
 */
exports.base64Decode = (encodedMessage) => Buffer.from(encodedMessage, "base64").toString()

/**
 * Create JsonWebToken
 * @param payload - Token payload
 * @returns 
 */
exports.jwt = (payload) => jsonwebtoken.sign(payload, secret, { algorithm: "HS256", expiresIn })