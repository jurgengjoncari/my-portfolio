const express = require('express')
const nodemailer = require('nodemailer')

const myAccount = require('minimist')(process.argv.slice(2))

const app = express()

app.use(express.urlencoded({ extended: false }))

app.use(express.static('public'))

app.post('/send', (req, res) => {
    const { email, subject, message } = req.body

    const transporter = nodemailer.createTransport({
        service: myAccount.service,
        auth: {
            user: myAccount.email,
            pass: myAccount.password
        },
        timeout: 10000
    })

    const mailOptions = {
        from: email,
        to: myAccount.email,
        subject: subject,
        text: message
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
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
})