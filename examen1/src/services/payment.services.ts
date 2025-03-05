import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-02-24.acacia',
    typescript: true
})


const createPaymentIntent = async (amount: number, paymentId: string, data: { phone: string; place: string; date: string; time: string; }) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
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
        })

        return paymentIntent
    } catch (error) {
        console.error(error);
        throw new Error('Error al crear el intento de pago')
    }
}

export const paymentServices = {
    createPaymentIntent
}