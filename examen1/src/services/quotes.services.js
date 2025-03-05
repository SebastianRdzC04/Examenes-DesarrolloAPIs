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
exports.quotesServices = void 0;
const database_1 = require("../database");
const models = __importStar(require("../database/schemas"));
const drizzle_orm_1 = require("drizzle-orm");
const quote_model_1 = require("../models/quote.model");
const createQuote = (quoteData) => __awaiter(void 0, void 0, void 0, function* () {
    const [quote] = yield database_1.db.insert(models.quotesSchema).values(quoteData).returning();
    const quoteComplete = yield database_1.db.query.quotesSchema.findFirst({
        where: (0, drizzle_orm_1.eq)(models.quotesSchema.id, quote.id),
        with: {
            user: true,
            place: true
        }
    });
    if (!quoteComplete) {
        throw new Error('Quote not found');
    }
    return new quote_model_1.Quote(quoteComplete);
});
const updateQuote = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const [quote] = yield database_1.db.update(models.quotesSchema)
        .set(data)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(models.quotesSchema.id, id), (0, drizzle_orm_1.eq)(models.quotesSchema.is_on, true)))
        .returning();
    return new quote_model_1.Quote(quote);
});
const getQuoteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [quote] = yield database_1.db.select()
        .from(models.quotesSchema)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(models.quotesSchema.id, id), (0, drizzle_orm_1.eq)(models.quotesSchema.is_on, true))).execute();
    const quoteWithRelations = yield database_1.db.query.quotesSchema.findFirst({
        where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(models.quotesSchema.id, id), (0, drizzle_orm_1.eq)(models.quotesSchema.is_on, true)),
        with: {
            user: true,
            place: true,
            event: true
        }
    });
    if (!quoteWithRelations) {
        throw new Error('Quote not found');
    }
    return new quote_model_1.Quote(quoteWithRelations);
});
const getQuotesByDate = (date) => __awaiter(void 0, void 0, void 0, function* () {
    const quotes = yield database_1.db.query.quotesSchema.findMany({
        where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(models.quotesSchema.date, date), (0, drizzle_orm_1.eq)(models.quotesSchema.is_on, true)),
        with: {
            user: true,
            place: true
        }
    });
    return quotes.map(quote => new quote_model_1.Quote(quote));
});
const getQuotesByPlace = (place_id) => __awaiter(void 0, void 0, void 0, function* () {
    const quotes = yield database_1.db.select()
        .from(models.quotesSchema)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(models.quotesSchema.place_id, place_id), (0, drizzle_orm_1.eq)(models.quotesSchema.is_on, true))).execute();
    return quotes.map(quote => new quote_model_1.Quote(quote));
});
const getQuotesByUser = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const quotes = yield database_1.db.select()
        .from(models.quotesSchema)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(models.quotesSchema.user_id, user_id), (0, drizzle_orm_1.eq)(models.quotesSchema.is_on, true))).execute();
    return quotes.map(quote => new quote_model_1.Quote(quote));
});
const acceptQuote = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [quote] = yield database_1.db.update(models.quotesSchema)
        .set({ status: 'accepted' })
        .where((0, drizzle_orm_1.eq)(models.quotesSchema.id, id))
        .returning();
    const quoteWithRelations = yield database_1.db.query.quotesSchema.findFirst({
        where: (0, drizzle_orm_1.eq)(models.quotesSchema.id, id),
        with: {
            user: true,
            place: true
        }
    });
    if (!quoteWithRelations) {
        throw new Error('Quote not found');
    }
    return new quote_model_1.Quote(quoteWithRelations);
});
const cancelQuote = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [quote] = yield database_1.db.update(models.quotesSchema)
        .set({ status: 'rejected' })
        .where((0, drizzle_orm_1.eq)(models.quotesSchema.id, id))
        .returning();
    return new quote_model_1.Quote(quote);
});
const deleteQuote = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [quote] = yield database_1.db.update(models.quotesSchema)
        .set({ is_on: false })
        .where((0, drizzle_orm_1.eq)(models.quotesSchema.id, id))
        .returning();
    return new quote_model_1.Quote(quote);
});
exports.quotesServices = {
    createQuote,
    updateQuote,
    getQuoteById,
    deleteQuote,
    getQuotesByDate,
    getQuotesByPlace,
    getQuotesByUser,
    cancelQuote,
    acceptQuote
};
