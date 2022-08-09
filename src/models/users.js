const fileSystem = require("fs/promises")
const crypto = require("../utils/crypto")
const config = require("../config")

const { usersPath } = config.models

/**
 * Model - Add new user
 * @param {string} email 
 * @param {string} password 
 */
exports.add = async (email, password) => {
    const fileContent = await fileSystem.readFile(usersPath)
    const users = JSON.parse(fileContent)
    const updatedUsers = users.concat({ email, password: crypto.sha256(password), balance: 0, movements: [] })
    await fileSystem.writeFile(usersPath, JSON.stringify(updatedUsers))
}

/**
 * Model - Get user by email
 * @param {string} email 
 * @returns 
 */
exports.get = async (email) => {
    const fileContent = await fileSystem.readFile(usersPath)
    const users = JSON.parse(fileContent)
    return users.find(user => user.email === email)
}

/**
 * Model - Update user balance and save movement record
 * @param {email} email 
 * @param {number} funds 
 */
exports.updateBalance = async (email, funds) => {
    const fileContent = await fileSystem.readFile(usersPath)
    const users = JSON.parse(fileContent)
    const updatedUsers = users.map(user => {
        if (user.email === email) {
            return {
                ...user,
                balance: user.balance + funds,
                movements: user.movements.concat({ funds, date: new Date().toISOString() })
            }
        }
        else return user
    })
    await fileSystem.writeFile(usersPath, JSON.stringify(updatedUsers))
}