"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportConfig = void 0;
const passport_jwt_1 = require("passport-jwt");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const passportConfig = (passport) => {
    const opts = {
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_KEY_SECRET || 'defaultSecret',
    };
    passport.use(new passport_jwt_1.Strategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload);
        return done(null, jwt_payload);
    }));
};
exports.passportConfig = passportConfig;
