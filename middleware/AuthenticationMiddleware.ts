import { NextFunction, Response, Request } from 'express';
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../error');

interface RequestCustom extends Request {

    user: {
        userId: string,
        name: string
    }
}
type userType = {
    userId: string,
    name: string,
}
const auth = (req: RequestCustom, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith('Bearer')) throw new UnauthorizedError('Authentication Invalid!');

    const token = authHeader.split(' ')[1];
    try {
        const payload: userType = jwt.verify(token, process.env.JWT_SECRET);
        const user: userType = { userId: payload.userId, name: payload.name }
        req.user = user;
        next();
    } catch (error) {
        throw new UnauthorizedError('Not authorized to access this route');
    }
};

module.exports = auth;