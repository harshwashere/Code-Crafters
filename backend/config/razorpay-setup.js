import Razorpay from 'razorpay'

const razorpay = new Razorpay({
    key_id: process.env.KEYID,
    key_secret: process.env.KEYSECRET
})

export default razorpay