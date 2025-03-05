import {param, body, validationResult, checkExact} from 'express-validator';
import { NextFunction, Response, Request, RequestHandler } from "express";


const validateDataToCreate = async (req: Request, res: Response, next: NextFunction) => {
    const validations = [
        body('data.quote_id').isUUID().optional().notEmpty().withMessage('Title is required'),
        body('data.time_toStart').isString().optional().notEmpty().withMessage('Date is required'),
        body('data.total_payed').isNumeric().optional().notEmpty().withMessage('place_id is required')
    ]
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return
    }

    next();
}

const validateDataAdmin: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const validations = [
        body('data.total_price').isString().optional().notEmpty().withMessage('Title is required'),
        body('data.total_debt').isNumeric().optional().notEmpty().withMessage('Date is required'),
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

const validateDataUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const validations = [
        body('data.total_price').isString().optional().notEmpty().withMessage('Title is required'),
        body('data.total_debt').isNumeric().optional().notEmpty().withMessage('Date is required'),
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

const validateEventId: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const validations = [
        param('id').isUUID().withMessage('Invalid quote id')
    ]
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
    ]
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
    ]
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return
    }
    next();
}

export const eventsValidator = {
    validateDataToCreate,
    validateDataAdmin,
    validateEventId,
    validatePlaceId,
    validateDataUser,
    validateUserId
}

