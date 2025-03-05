import {param, body, validationResult, checkExact} from 'express-validator';
import { NextFunction, Response, Request, RequestHandler } from "express";


const validateQuoteDataUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const validations = [
        body('data.title').isString().optional().notEmpty().withMessage('Title is required'),
        body('data.date').isDate().optional().notEmpty().withMessage('Date is required'),
        body('data.place_id').isUUID().optional().notEmpty().withMessage('place_id is required')
    ]

    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return
    }

    next();
}



const validateQuoteDataAdmin: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const validations = [
        body('data.estimated_price').isString().optional().notEmpty().withMessage('Title is required'),
        body('data.espected_advance').isNumeric().optional().notEmpty().withMessage('Date is required'),
        body('data.place_id').isUUID().optional().notEmpty().withMessage('place_id is required')
    ]

    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return
    }

    next();
}

const validateQuoteId: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
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
}

const validatePlaceId: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const validations = [
        param('place_id').isUUID().withMessage('Invalid place id')
    ];

    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return
    }

    next();
}

const validateUserId: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const validations = [
        param('user_id').isUUID().withMessage('Invalid user id')
    ];

    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return
    }

    next();
}

export const quotesValidator = {
    validateQuoteDataUser,
    validateQuoteDataAdmin,
    validateQuoteId,
    validatePlaceId,
    validateUserId
}