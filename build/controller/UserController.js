"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel = require('../models/UserModel');
const { StatusCodes } = require('http-status-codes');
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.user.userId)
    const thekeyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ]
        } : {};
    const users = yield UserModel.find(thekeyword)
        .find({
        _id: { $ne: req.user.userId }
    });
    res.status(StatusCodes.OK).json({ users });
});
const tmp = (req, res) => {
    res.send('tt');
};
module.exports = { index, tmp };
//# sourceMappingURL=UserController.js.map