"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { register, login } = require('../controller/AuthController');
const { index } = require('../controller/UserController');
const auth = require('../middleware/AuthenticationMiddleware');
router.post('/auth/login', login);
router.post('/auth/register', register);
router.get('/', auth, index);
module.exports = router;
