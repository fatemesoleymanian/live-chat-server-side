import { Response, Request } from 'express';
const UserModel = require('../models/UserModel')
const { StatusCodes } = require('http-status-codes');
interface RequestCustom extends Request {

    user: {
        userId: string,
        name: string
    }
}
const index = async (req: RequestCustom, res: Response) => {
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
    res.status(StatusCodes.OK).json({ users })
}
const tmp = (req: Request, res: Response) => {
    res.send('tt')
}
module.exports = { index, tmp }