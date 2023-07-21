"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel = require('../models/UserModel');
const { StatusCodes } = require('http-status-codes');
const index = async (req, res) => {
    // console.log(req.user.userId)
    const thekeyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ]
        } : {};
    const users = await UserModel.find(thekeyword)
        .find({
        _id: { $ne: req.user.userId }
    });
    res.status(StatusCodes.OK).json({ users });
};
const tmp = (req, res) => {
    res.send('tt');
};
module.exports = { index, tmp };
