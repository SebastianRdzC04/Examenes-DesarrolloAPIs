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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const webhook_router_1 = __importDefault(require("./src/routes/webhook.router"));
const users_router_1 = __importDefault(require("./src/routes/users.router"));
const auth_router_1 = __importDefault(require("./src/routes/auth.router"));
const places_router_1 = __importDefault(require("./src/routes/places.router"));
const passport_1 = __importDefault(require("passport"));
const auth_1 = require("./src/auth");
(0, auth_1.passportConfig)(passport_1.default);
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use('/webhook', webhook_router_1.default);
app.use(express_1.default.json());
app.use('/users', users_router_1.default);
app.use('/auth', auth_router_1.default);
app.use('/places', places_router_1.default);
app.get('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: 'Hello World' });
}));
app.listen(port, () => {
    console.log('Server running on port ', port);
});
