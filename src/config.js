const dotenv = require("dotenv")

dotenv.config()

const { PORT, JWT_SECRET } = process.env

module.exports = {
    api: {
        port: PORT,
        host: "localhost"
    },
    jwt: {
        secret: JWT_SECRET,
        expiresIn: 3600 // 1 hour
    },
    models: {
        usersPath: "data/users.json"
    }
}