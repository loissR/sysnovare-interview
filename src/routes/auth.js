const authControllers = require("../controllers/auth")
const validations = require("../validations/auth")

module.exports = [
    {
        method: "POST",
        path: "/login",
        handler: authControllers.login,
        options: {
            validate: validations.login
        }
    }
]