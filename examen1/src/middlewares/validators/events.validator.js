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
exports.eventsValidator = void 0;
const express_validator_1 = require("express-validator");
const validateDataToCreate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validations = [
        (0, express_validator_1.body)('data.quote_id').isUUID().optional().notEmpty().withMessage('Title is required'),
        (0, express_validator_1.body)('data.time_toStart').isString().optional().notEmpty().withMessage('Date is required'),
        (0, express_validator_1.body)('data.total_payed').isNumeric().optional().notEmpty().withMessage('place_id is required')
    ];
    yield Promise.all(validations.map(validation => validation.run(req)));
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return;
    }
    next();
});
const validateDataAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validations = [
        (0, express_validator_1.body)('data.total_price').isString().optional().notEmpty().withMessage('Title is required'),
        (0, express_validator_1.body)('data.total_debt').isNumeric().optional().notEmpty().withMessage('Date is required'),
        (0, express_validator_1.body)('data.place_id').isUUID().optional().notEmpty().withMessage('place_id is required')
    ];
    yield Promise.all(validations.map(validation => validation.run(req)));
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return;
    }
    next();
});
const validateDataUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validations = [
        (0, express_validator_1.body)('data.total_price').isString().optional().notEmpty().withMessage('Title is required'),
        (0, express_validator_1.body)('data.total_debt').isNumeric().optional().notEmpty().withMessage('Date is required'),
        (0, express_validator_1.body)('data.place_id').isUUID().optional().notEmpty().withMessage('place_id is required')
    ];
    yield Promise.all(validations.map(validation => validation.run(req)));
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return;
    }
    next();
});
const validateEventId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validations = [
        (0, express_validator_1.param)('id').isUUID().withMessage('Invalid quote id')
    ];
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return;
    }
    next();
});
const validatePlaceId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validations = [
        (0, express_validator_1.param)('place_id').isUUID().withMessage('Invalid place id')
    ];
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return;
    }
    next();
});
const validateUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validations = [
        (0, express_validator_1.param)('user_id').isUUID().withMessage('Invalid user id')
    ];
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return;
    }
    next();
});
exports.eventsValidator = {
    validateDataToCreate,
    validateDataAdmin,
    validateEventId,
    validatePlaceId,
    validateDataUser,
    validateUserId
};
