"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel = require('../models/UserModel');
const { StatusCodes } = require('http-status-codes');
const { BadRequest, UnauthorizedError } = require('../error');
const login = async (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
        throw new BadRequest('Please provide username and password!');
    }
    const user = await UserModel.findOne({ name });
    if (!user)
        throw new UnauthorizedError('There no user with such username!');
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect)
        throw new UnauthorizedError('Invalid password!');
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
        user: {
            name: user.getName(),
            email: user.getEmail(),
            _id: user._id
        }, token
    });
};
const register = async (req, res) => {
    await UserModel.registerValidation(req.body).catch((err) => {
        err.statusCode = 400;
        throw err;
    });
    const user = await UserModel.create(Object.assign({}, req.body));
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
        user: {
            name: user.getName(),
            email: user.getEmail(),
            _id: user._id
        }, token
    });
};
module.exports = {
    login,
    register
};
