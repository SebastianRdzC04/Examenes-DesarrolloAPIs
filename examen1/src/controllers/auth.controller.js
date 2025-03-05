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
exports.authController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_services_1 = require("../services/users.services");
const express_validator_1 = require("express-validator");
const roles_services_1 = require("../services/roles.services");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = (0, express_validator_1.matchedData)(req, { locations: ['body'] });
    if (!data) {
        res.status(400).json({ msg: 'Data does not exist', err: data });
        return;
    }
    const userExisting = yield users_services_1.usersServices.getUserByPhone(data.phone);
    if (userExisting) {
        res.status(400).json({ msg: 'User already exists', ctx: [] });
        return;
    }
    const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
    const role = yield roles_services_1.rolesServices.getRoleByName('client');
    const userToCreate = Object.assign(Object.assign({}, data), { role_id: role.id, password: hashedPassword });
    try {
        const user = yield users_services_1.usersServices.createUser(userToCreate);
        console.log(user.role);
        res.json({ msg: 'User created', ctx: [user] });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error', ctx: [] });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, password } = (0, express_validator_1.matchedData)(req, { locations: ['body'] });
    const user = yield users_services_1.usersServices.getUserByPhone(phone);
    if (!user) {
        res.status(404).json({ msg: 'User not found', ctx: [] });
        return;
    }
    const userRol = yield roles_services_1.rolesServices.getRoleById(user.role_id);
    const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch) {
        res.status(400).json({ msg: 'Invalid credentials', ctx: [] });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, role: userRol.name }, process.env.JWT_KEY_SECRET, { expiresIn: '1h' });
    res.json({ msg: 'Login successful', data: { token: token } });
});
exports.authController = {
    register,
    login,
};
