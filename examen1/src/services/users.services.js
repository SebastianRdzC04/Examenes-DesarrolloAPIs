"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.usersServices = void 0;
const database_1 = require("../database");
const models = __importStar(require("../database/schemas"));
const user_model_1 = require("../models/user.model");
const drizzle_orm_1 = require("drizzle-orm");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.db.select().from(models.usersSchema).where((0, drizzle_orm_1.eq)(models.usersSchema.is_on, true)).execute();
});
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const [user] = yield database_1.db.insert(models.usersSchema).values(userData).returning();
    const userWithRole = yield database_1.db.query.usersSchema.findFirst({
        where: (0, drizzle_orm_1.eq)(models.usersSchema.id, user.id),
        with: {
            role: true
        }
    });
    console.log(userWithRole);
    if (!userWithRole) {
        throw new Error('User not found');
    }
    const userCreated = new user_model_1.User(userWithRole);
    return userWithRole;
});
const getUserByPhone = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    const [user] = yield database_1.db.select()
        .from(models.usersSchema)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(models.usersSchema.phone, phone), (0, drizzle_orm_1.eq)(models.usersSchema.is_on, true)))
        .execute();
    return user;
});
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [user] = yield database_1.db.select()
        .from(models.usersSchema)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(models.usersSchema.id, id), (0, drizzle_orm_1.eq)(models.usersSchema.is_on, true))).execute();
    return user;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [user] = yield database_1.db.update(models.usersSchema)
        .set({ is_on: false })
        .where((0, drizzle_orm_1.eq)(models.usersSchema.id, id))
        .returning();
    return user;
});
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const [user] = yield database_1.db.update(models.usersSchema)
        .set(data)
        .where((0, drizzle_orm_1.eq)(models.usersSchema.id, id))
        .returning();
    return user;
});
exports.usersServices = {
    getAllUsers,
    createUser,
    getUserByPhone,
    deleteUser,
    updateUser,
    getUserById
};
