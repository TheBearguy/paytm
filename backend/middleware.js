const { JWT_SECRET } = require("./config");
const {jwt, decode} = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authHeader = req.header.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({
            msg: "authMiddleware :: ERROR ::  Invalid authorization in header"
        })
    }
    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = jwt.verify(token);
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        return res.status(403).json({
            msg: "authMiddleware :: ERROR :: ", error
        })
    }
}

module.exports = {
    authMiddleware
}
