const express = require('express');
const cors = require('cors');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const app = express();
require("dotenv").config();
var defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;

app.use(express.json());
app.use(cors());

app.post('/sendemail', async (req, res) => {
    try {
        var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        const sender = {
            email: "dug7904@gmail.com",
            name: "Satyabrata Mishra"
        };
        const receivers = [
            {
                email: req.body.email
            }
        ];
        const sendEmail = await apiInstance.sendTransacEmail({
            sender:sender,
            to: receivers, 
            subject: "Sellerkin Email Automation Tool",
            textContent:"Thanks for subscribing"
        });
        return res.send(sendEmail);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

app.get('/', (req, res) => {
    res.status(200).json({ "message": "I am sellerkin email automation tool backend." });
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server Running At Port ${process.env.PORT || 5000}.`)
});