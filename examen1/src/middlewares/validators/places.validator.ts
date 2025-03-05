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

const validateData: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const validations = [
        body('data.name').isString().optional().withMessage('Name is required'),
        body('data.description').optional().isString().withMessage('Description is required'),
        body('data.max_capacity').optional().isNumeric().withMessage('Max capacity must be a number')
    ];

    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return
    }

    next();
};

export const placesValidator = {
    validateData,
    validateId
};
