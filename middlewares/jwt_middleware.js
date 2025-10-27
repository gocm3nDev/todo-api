const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function verifyToken(req, res, next ) {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(403).json({res:'Unauthorized access denied. No token'});
    }

    try {
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodedPayload;

        next();
    } catch (err) {
        return res.status(401).json({ res: 'Invalid or expired token.' });
    }
}

module.exports = verifyToken;