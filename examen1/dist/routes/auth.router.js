"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_validator_1 = require("../middlewares/validators/auth.validator");
const router = express_1.default.Router();
router.post('/register', auth_validator_1.authValidator.validateRegisterData, auth_controller_1.authController.register);
router.post('/login', auth_validator_1.authValidator.validateLoginData, auth_controller_1.authController.login);
exports.default = router;
