import express, {Request, Response} from "express";
import Stripe from "stripe";
import {messageServices} from "../services/message.services";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-02-24.acacia',
    typescript: true
})

const router = express.Router()

router.post('/',express.raw({type: 'application/json'}), async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
        return
    }

    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        console.log('Pago exitoso:', paymentIntent.metadata);

        try {
            await messageServices.sendMessage(paymentIntent.metadata.phone, `Tu pago ha sido exitoso, tu cita ha sido agendada para el 
            ${paymentIntent.metadata.date} a las 
            ${paymentIntent.metadata.time} en ${paymentIntent.metadata.place}`)
        } catch (err) {
            console.error(err)
        }


    } else if (event.type === 'payment_intent.payment_failed') {
        console.log('Pago fallido:', event.data.object.id);
    }

    res.json({ received: true });
})

export default router