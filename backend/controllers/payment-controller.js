export const createOrder = async(req, res) => {
    try {
        const {amount, currency, reciept, notes} = req.body
        
    } catch (error) {
        console.log('This error is from payment-router.js            ',error);
    }
}