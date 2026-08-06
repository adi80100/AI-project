import { Router } from "express";
import { createOrder, verifyPayment } from "../controllers/billing.controller.js";
const router= Router()

router.route("/create").post(createOrder)
router.route("/verify").post(verifyPayment)


export default router