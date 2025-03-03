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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const users_services_1 = require("../services/users.services");
const express_validator_1 = require("express-validator");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_services_1.usersServices.getAllUsers();
    res.json({ msg: 'All users', ctx: [users] });
    return;
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield users_services_1.usersServices.getUserById(id);
        if (!user) {
            res.status(404).json({ msg: 'User not found', ctx: [] });
            return;
        }
        res.json({ msg: 'User by id', ctx: [user] });
    }
    catch (err) {
        res.status(500).json({ msg: 'Internal server error', ctx: [], err });
    }
});
const getUserByPhone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone } = req.params;
    try {
        const user = yield users_services_1.usersServices.getUserByPhone(phone);
        if (!user) {
            res.status(404).json({ msg: 'User not found', ctx: [] });
            return;
        }
        res.json({ msg: 'User by phone', ctx: [user] });
    }
    catch (err) {
        res.status(500).json({ msg: 'Internal server error', ctx: [], err });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, data } = (0, express_validator_1.matchedData)(req, { locations: ['body'] });
    try {
        const userExisting = yield users_services_1.usersServices.getUserById(id);
        if (!userExisting) {
            res.status(400).json({ msg: 'User does not exist', ctx: [] });
            return;
        }
        const user = yield users_services_1.usersServices.updateUser(id, data);
        res.json({ msg: 'User updated', ctx: [user] });
    }
    catch (err) {
        res.status(500).json({ msg: 'Internal server error', ctx: [], err: err });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existingUser = yield users_services_1.usersServices.getUserById(id);
        if (!existingUser) {
            res.status(400).json({ msg: 'User does not exist', ctx: [] });
            return;
        }
        const user = yield users_services_1.usersServices.deleteUser(id);
        res.json({ msg: 'User deleted', ctx: [user] });
    }
    catch (err) {
        res.status(500).json({ msg: 'Internal server error', ctx: [], err: err });
    }
});
exports.userController = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByPhone,
};
