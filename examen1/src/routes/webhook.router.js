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
const express_1 = __importDefault(require("express"));
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-02-24.acacia',
    typescript: true
});
const router = express_1.default.Router();
router.post('/', express_1.default.raw({ type: 'application/json' }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
        return;
    }
    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        console.log('Pago exitoso:', paymentIntent.id);
    }
    else if (event.type === 'payment_intent.payment_failed') {
        console.log('Pago fallido:', event.data.object.id);
    }
    res.json({ received: true });
}));
exports.default = router;
