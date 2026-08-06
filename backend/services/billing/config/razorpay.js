import dotenv from "dotenv"
import Razorpay from "razorpay"
dotenv.config()
const razorpay = new Razorpay({
    key_id:process.env.RZORPAY_KEY_ID,
    key_secret:process.env.RZORPAY_KEY_SECRET,
})

export default razorpay