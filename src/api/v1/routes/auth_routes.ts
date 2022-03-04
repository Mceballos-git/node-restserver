const Router = require('express');
const { check } = require('express-validator');

import { login } from '../controllers/auth_controller';
import { validateFields } from '../middlewares/validate_fields';

const router = Router();

router.post( '/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Pass is required').not().isEmpty(),
    validateFields
], login );

module.exports = router 