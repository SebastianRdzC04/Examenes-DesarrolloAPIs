import { param, body, validationResult } from 'express-validator';
import { NextFunction, Response, Request, RequestHandler } from "express";

const validateId: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const validations = [
        param('id').isUUID().withMessage('Invalid quote id')
    ];

    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return
    }

    next();
};

const validatePhone: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const validations = [
        param('number').isString().isLength({min: 10, max: 15}).withMessage('Invalid phone number')
    ]
    await Promise.all(validations.map(validation => validation.run(req)));
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return
    }
    next();
}

const validateData: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const validations = [
        body('data').isObject().notEmpty().withMessage('Data is required'),
        body('data.username').isString().withMessage('Name is required'),
        body('data.phone').isString().withMessage('Description is required'),
    ];

    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return
    }

    next();
};

export const usersValidator = {
    validateId,
    validatePhone,
    validateData
};