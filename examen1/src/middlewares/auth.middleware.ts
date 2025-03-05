import {Request, Response, NextFunction} from 'express';

const roleMiddleware = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user?.role !== role) {
            return res.status(401).json({msg: 'Unauthorized'});
        }
        next();
    }
}

export const authMiddlewares = {
    roleMiddleware
}