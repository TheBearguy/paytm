const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({
            msg: "authMiddleware :: ERROR ::  Invalid authorization in header"
        })
    }
    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);

        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        console.log(error);

        return res.status(403).json({
            msg: "authMiddleware :: ERROR :: error while decoding token or passing the control to the controller",
            error
        })
    }
}

module.exports = {
    authMiddleware
}
