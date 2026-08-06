import { PLANS } from "../config/plans.js"
import razorpay from "../config/razorpay.js"
import { Payment } from "../models/payment.model.js"
import axios from "axios"
import crypto from "crypto"
import dotenv from "dotenv"

dotenv.config()
const createOrder = async (req,res)=>{
    try {
        console.log("Reached createOrder");
  console.log(req.body);
        const {plan} = req.body
        const userId = req.headers["x-user-id"]
        const selectedPlans = PLANS[plan]

        if(!selectedPlans) {
            return res.status(400).json({"mesage":"plan not found"})
        }

        const order = await razorpay.orders.create({
            amount: selectedPlans.amount*100,
            currency: "INR",
            receipt:`receipt-${Date.now()}`,

        })

        await Payment.create({
            userId,
            orderId:order.id,
            amount:selectedPlans.amount,
            credits:selectedPlans.credits,
            plan:selectedPlans.id,
            currency:order.currency,
            status:"created"

        })
        return res.status(200).json({order,plan:selectedPlans})

    } catch (error) {
                return res.status(400).json({message:`create order error: ${error}`})

    }
}

// signatire from frotned is verify here inorder to get wehter its verfied

 const verifyPayment = async (req,res)=>{
    try {
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body

        const generateSignature = crypto
                                        .createHmac("sha256",process.env.RZORPAY_KEY_SECRET)
                                        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
                                        .digest("hex")

        if(generateSignature !== razorpay_signature){
            return res.status(400).json({message:"payment verfication failed"})
        }

        const payment = await Payment.findOne({orderId:razorpay_order_id})
        if(!payment){
            return res.status(400).json({message:"Payment not found"})
        }

        payment.status="paid",
        payment.paymentId = razorpay_payment_id

        await payment.save()

       const data =  await axios.post(`${process.env.AUTH_SERVICE_URL}/update-plan`,{
                    userId:payment.userId,
                    plan:payment.plan,
                    credits:payment.credits    
                })
            
        console.log(data)
        
                return res.status(200).json({message:"payment verified"})

    } catch (error) {
                return res.status(500).json({message:`payment not found: ,${error}`})
    }
}

export {createOrder,verifyPayment}