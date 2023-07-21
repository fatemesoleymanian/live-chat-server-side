import express, { Router } from 'express';
const router: Router = express.Router()

const { register, login } = require('../controller/AuthController');
const { index } = require('../controller/UserController');
const auth = require('../middleware/AuthenticationMiddleware')

router.post('/auth/login', login);
router.post('/auth/register', register);
router.get('/',auth, index);

module.exports = router;