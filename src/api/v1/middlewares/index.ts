import { validateFields } from "../middlewares/validate_fields";
import { checkToken } from '../middlewares/check_token';
import { checkIsAdmin, checkIsHaveARole, checkIsValidRole } from '../middlewares/validate_roles';

module.exports = {
    validateFields,
    checkToken,
    checkIsAdmin,
    checkIsHaveARole,
    checkIsValidRole
}