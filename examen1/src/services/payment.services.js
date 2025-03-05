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
exports.paymentServices = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-02-24.acacia',
    typescript: true
});
const createPaymentIntent = (amount, paymentId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentIntent = yield stripe.paymentIntents.create({
            amount,
            currency: 'mxn',
            payment_method: paymentId,
            confirm: true,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'
            },
            metadata: {
                phone: data.phone,
                place: data.place,
                date: data.date,
                time: data.time,
            }
        });
        return paymentIntent;
    }
    catch (error) {
        console.error(error);
        throw new Error('Error al crear el intento de pago');
    }
});
exports.paymentServices = {
    createPaymentIntent
};
