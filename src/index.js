const Hapi = require("@hapi/hapi")
const Jwt = require("hapi-auth-jwt2")
const jwtStrategy = require("./plugins/jwt")
const authRoutes = require("./routes/auth")
const usersRoutes = require("./routes/users")
const config = require("./config")

/**
 * Setup and Start Server
 */
module.exports = async () => {
    // Create Server
    const server = Hapi.server(config.api)
    // Strategies
    await server.register(Jwt)
    server.auth.strategy("jwt", "jwt", jwtStrategy)
    // Set routes
    server.route(authRoutes)
    server.route(usersRoutes)
    // Start Server
    await server.start()
    console.log("Server running on %s", server.info.uri)
}