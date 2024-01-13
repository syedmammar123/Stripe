const express = require("express")
const app = express()
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({
  origin:["http://localhost:5173"],
  methods:["POST","PUT","DELETE","GET"],
  credentials:true
}))


app.post("/payment", async (req, res) => { 
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Therapy Money",
			payment_method: id,
			application_fee_amount: 367,
			transfer_data: {
			destination: 'acct_1NSGHLAcxbsuh4wI',
			},
              automatic_payment_methods: { allow_redirects: 'always', enabled: true },
			// confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})




app.listen(4000, () => {
	console.log(`Server is listening on port ${4000}`)
})
