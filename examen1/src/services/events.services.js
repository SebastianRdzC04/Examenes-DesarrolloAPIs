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
exports.eventsServices = void 0;
const database_1 = require("../database");
const models = __importStar(require("../database/schemas"));
const drizzle_orm_1 = require("drizzle-orm");
const event_model_1 = require("../models/event.model");
const createEvent = (eventData) => __awaiter(void 0, void 0, void 0, function* () {
    const [event] = yield database_1.db.insert(models.eventsSchema).values(eventData).returning();
    const eventComplete = yield database_1.db.query.eventsSchema.findFirst({
        where: (0, drizzle_orm_1.eq)(models.eventsSchema.id, event.id),
        with: {
            user: true,
            place: true,
            quote: true
        }
    });
    if (!eventComplete) {
        throw new Error('Event not found');
    }
    return new event_model_1.Event(eventComplete);
});
const updateEvent = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const [event] = yield database_1.db.update(models.eventsSchema)
        .set(data)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(models.eventsSchema.id, id), (0, drizzle_orm_1.eq)(models.eventsSchema.is_on, true)))
        .returning();
    return new event_model_1.Event(event);
});
const getEventById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [event] = yield database_1.db.select()
        .from(models.eventsSchema)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(models.eventsSchema.id, id), (0, drizzle_orm_1.eq)(models.eventsSchema.is_on, true))).execute();
    return new event_model_1.Event(event);
});
const getEventsByDate = (date) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield database_1.db.query.eventsSchema.findMany({
        where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(models.eventsSchema.date, date), (0, drizzle_orm_1.eq)(models.eventsSchema.is_on, true)),
        with: {
            user: true,
            place: true,
            quote: true
        }
    });
    return events.map(event => new event_model_1.Event(event));
});
const getEventsByPlace = (place_id) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield database_1.db.select()
        .from(models.eventsSchema)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(models.eventsSchema.place_id, place_id), (0, drizzle_orm_1.eq)(models.eventsSchema.is_on, true))).execute();
    return events.map(event => new event_model_1.Event(event));
});
const getEventsByUser = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield database_1.db.select()
        .from(models.eventsSchema)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(models.eventsSchema.user_id, user_id), (0, drizzle_orm_1.eq)(models.eventsSchema.is_on, true))).execute();
    return events.map(event => new event_model_1.Event(event));
});
const cancelEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [event] = yield database_1.db.update(models.eventsSchema)
        .set({ status: 'cancelled' })
        .where((0, drizzle_orm_1.eq)(models.eventsSchema.id, id))
        .returning();
    return new event_model_1.Event(event);
});
const startEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [event] = yield database_1.db.update(models.eventsSchema)
        .set({ status: 'on process' })
        .where((0, drizzle_orm_1.eq)(models.eventsSchema.id, id))
        .returning();
    return new event_model_1.Event(event);
});
const finishEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [event] = yield database_1.db.update(models.eventsSchema)
        .set({ status: 'done' })
        .where((0, drizzle_orm_1.eq)(models.eventsSchema.id, id))
        .returning();
    return new event_model_1.Event(event);
});
const deleteEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [event] = yield database_1.db.update(models.eventsSchema)
        .set({ is_on: false })
        .where((0, drizzle_orm_1.eq)(models.eventsSchema.id, id))
        .returning();
    return new event_model_1.Event(event);
});
exports.eventsServices = {
    createEvent,
    updateEvent,
    getEventById,
    getEventsByDate,
    getEventsByPlace,
    getEventsByUser,
    cancelEvent,
    startEvent,
    finishEvent,
    deleteEvent
};
