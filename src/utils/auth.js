const jwt = require('jsonwebtoken')

const getToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
}

const authentication = async (req, res, next) => {
    const token = req.headers['x-access-token'] ||
        req.query.token ||
        req.body.token ||
        req.headers.token ||
        req.headers.authorization

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(400).send({ success: false, error: 'malformed or invalid token' })
            } else {
                res.locals.user = decoded
                next()
            }
        })
    } else {
        res.status(400).send({
            error: '11 malformed or invalid token'
        })
    }
}

module.exports = {
    authentication,
    getToken
}