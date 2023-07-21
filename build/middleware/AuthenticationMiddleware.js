"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../error');
const auth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith('Bearer'))
        throw new UnauthorizedError('Authentication Invalid!');
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = { userId: payload.userId, name: payload.name };
        req.user = user;
        next();
    }
    catch (error) {
        throw new UnauthorizedError('Not authorized to access this route');
    }
};
module.exports = auth;
//# sourceMappingURL=AuthenticationMiddleware.js.map