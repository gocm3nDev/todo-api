const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET; 

const checkUser = (req, res, next) => {
    const token = req.cookies.authToken;

    if (token) {
        try {
            const decodedPayload = jwt.verify(token, JWT_SECRET);
            
            req.user = decodedPayload;
        } catch (err) {
            req.user = null;
        }
    } else {
        req.user = null;
    }

    next();
};

module.exports = checkUser;