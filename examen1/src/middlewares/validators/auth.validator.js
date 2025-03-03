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
exports.authValidator = void 0;
const express_validator_1 = require("express-validator");
const validateLoginData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validations = [
        (0, express_validator_1.body)('phone').isString().isLength({ min: 10, max: 18 }).notEmpty().withMessage('Phone is required'),
        (0, express_validator_1.body)('password').isString().withMessage('password is required'),
    ];
    yield Promise.all(validations.map(validation => validation.run(req)));
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return;
    }
    next();
});
const validateRegisterData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validationsA = [
        (0, express_validator_1.body)('data').isObject().notEmpty().withMessage('Data is required'),
        (0, express_validator_1.body)('data.phone').isString().isLength({ min: 10, max: 18 }).notEmpty().withMessage('Phone is required'),
        (0, express_validator_1.body)('data.password').isString().notEmpty().withMessage('Password is required'),
        (0, express_validator_1.body)('data.username').isString().notEmpty().withMessage('Username is required'),
    ];
    yield Promise.all(validationsA.map(validation => validation.run(req)));
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ erroreshdp: errors.array() });
        return;
    }
    next();
});
exports.authValidator = {
    validateLoginData,
    validateRegisterData
};
