"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_jwt_1 = require("express-jwt");
const jwtMiddleware = (0, express_jwt_1.expressjwt)({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    requestProperty: 'user',
    credentialsRequired: true,
    getToken: (req) => {
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer ')) {
            return req.headers.authorization.split(' ')[1];
        }
        return req.cookies.token;
    },
});
const authenticateJWT = (req, res, next) => {
    jwtMiddleware(req, res, (err) => {
        if (err) {
            console.log('Error in JWT middleware:', err);
            return res.status(401).json({ message: 'Unauthorized' });
        }
        next();
    });
};
exports.default = authenticateJWT;
