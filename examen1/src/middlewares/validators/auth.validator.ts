import { param, body, validationResult } from 'express-validator';
import { NextFunction, Response, Request, RequestHandler } from "express";

const validateLoginData: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const validations = [
        body('phone').isString().isLength({min: 10, max: 18}).notEmpty().withMessage('Phone is required'),
        body('password').isString().withMessage('password is required'),
    ];

    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return
    }

    next();
};

const validateRegisterData = async (req: Request, res: Response, next: NextFunction) => {
    const validationsA = [
        body('data').isObject().notEmpty().withMessage('Data is required'),
        body('data.phone').isString().isLength({min: 10, max: 18}).notEmpty().withMessage('Phone is required'),
        body('data.password').isString().notEmpty().withMessage('Password is required'),
        body('data.username').isString().notEmpty().withMessage('Username is required'),
    ]
    await Promise.all(validationsA.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ erroreshdp: errors.array() });
        return;
    }

    next();
}

export const authValidator = {
    validateLoginData,
    validateRegisterData
};