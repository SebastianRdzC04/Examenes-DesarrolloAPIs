"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const users_validator_1 = require("../middlewares/validators/users.validator");
const router = express_1.default.Router();
router.get('/all', user_controller_1.userController.getAllUsers);
router.get('/:id', users_validator_1.usersValidator.validateId, user_controller_1.userController.getUserById);
router.get('/phone/:number', users_validator_1.usersValidator.validatePhone, user_controller_1.userController.getUserByPhone);
router.delete('/:id', users_validator_1.usersValidator.validateId, user_controller_1.userController.deleteUser);
exports.default = router;
