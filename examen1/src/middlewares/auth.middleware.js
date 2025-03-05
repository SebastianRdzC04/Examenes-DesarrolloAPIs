"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddlewares = void 0;
const roleMiddleware = (role) => {
    return (req, res, next) => {
        var _a;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== role) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }
        next();
    };
};
exports.authMiddlewares = {
    roleMiddleware
};
