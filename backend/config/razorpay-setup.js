import Razorpay from 'razorpay'

export const razorpay = new Razorpay({
    key_id: process.env.KEYID,
    key_secret: process.env.KEYSECRET
})