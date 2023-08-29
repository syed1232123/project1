const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser'); // Import the body-parser middleware
const app = express();

// Use body-parser middleware
app.use(bodyParser.json());

// Other middleware and configurations

// Define a route to handle form submission
app.post('/submit', (req, res) => {
    // Extract form data from req.body
    const studentID = req.body.studentID;
    const name = req.body.name;
    const section = req.body.section;
    const branch = req.body.branch;
    const malpracticeType = req.body.malpracticeType;
    const otherOption = req.body.otherOption;

    // Configure Nodemailer to send email
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'janiya67@ethereal.email',
            pass: '4wkaNEvK38R7vjkB3q'
        }
    });

    const mailOptions = {
        from: 'janiya67@ethereal.email',
        to: 'recipient@example.com', // Replace with recipient email
        subject: 'Form Submission',
        text: `
            Student ID: ${studentID}
            Name: ${name}
            Section: ${section}
            Branch: ${branch}
            Malpractice Type: ${malpracticeType}
            Other Option: ${otherOption || 'N/A'}
        `
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Error sending email' });
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ message: 'Form submitted successfully' });
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
