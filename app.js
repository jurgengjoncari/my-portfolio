const express = require('express')
const nodemailer = require('nodemailer')
const args = require('minimist')(process.argv.slice(2))

const app = express()

app.use(express.urlencoded({ extended: false }))

app.post('/send', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: args.service,
        auth: {
            user: args.email,
            pass: args.password
        },
        timeout: 10000
    })

    const mailOptions = {
        from: req.body.email,
        to: args.email,
        subject: req.body.subject,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error')
        } else {
            console.log('Email sent: ' + info.response);
            res.send('success')
        }
    })
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
})