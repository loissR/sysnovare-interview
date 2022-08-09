const usersController = require("../controllers/users")
const validations = require("../validations/users")

module.exports = [
    {
        method: "POST",
        path: "/subscribe",
        handler: usersController.subscribe,
        options: {
            validate: validations.subscribe
        }
    },
    {
        method: "GET",
        path: "/funds",
        handler: usersController.getFunds,
        options: {
            auth: "jwt"
        }
    },
    {
        method: "GET",
        path: "/movements",
        handler: usersController.getMovements,
        options: {
            auth: "jwt"
        }
    },
    {
        method: "PUT",
        path: "/funds",
        handler: usersController.addFunds,
        options: {
            validate: validations.addFunds,
            auth: "jwt"
        }
    },
    {
        method: "DELETE",
        path: "/funds",
        handler: usersController.removeFunds,
        options: {
            validate: validations.removeFunds,
            auth: "jwt"
        }
    }
]