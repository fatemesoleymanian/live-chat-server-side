"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidator, loginValidator } = require("../validators/auth");
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name.'],
        unique: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, 'Please provide email.'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ]
    },
    password: {
        type: String,
        required: [true, 'Please provide password.'],
        minlength: 6,
    }
}, {
    timestamps: true
});
UserSchema.pre('save', async function (next) {
    //hash password with bcrypyjs before inserting
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
});
UserSchema.methods.getName = function () {
    return this.name;
};
UserSchema.methods.getEmail = function () {
    return this.email;
};
UserSchema.methods.createJWT = function () {
    return jwt.sign({
        userId: this._id,
        name: this.name
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    });
};
UserSchema.statics.registerValidation = function (body) {
    return registerValidator.validate(body, { abortEarly: false });
};
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcryptjs.compare(candidatePassword, this.password);
    return isMatch;
};
module.exports = mongoose_1.default.model('User', UserSchema);
