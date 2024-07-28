import nodemailer from "nodemailer";

const sendMail = async (message) => {
  try {
    const mailTransporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.PASS,
      },
    });

    let mailDetails = {
      from: process.env.USER,
      to: message.to,
      subject: "Password Reset OTP",
      html: `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset OTP</title>
          <style>
              body {
                  font-family: 'Arial', sans-serif;
                  background-color: #f4f4f4;
                  color: #333;
                  margin: 0;
                  padding: 0;
              }
      
              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  background-color: #fff;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
      
              h1 {
                  color: #007bff;
              }
      
              p {
                  line-height: 1.6;
              }
          </style>
      </head>
      
      <body>
          <div class="container">
              <h1>Password Reset OTP</h1>
              <p>Your One-Time Password (OTP) for password reset is: <strong>${message.otp}</strong></p>
              <p>Please use this code to reset your password. If you didn't request this, you can ignore this email.</p>
          </div>
      </body>
      
      </html>
      
  `,
      text: `Your One-Time Password (OTP) for password reset is: ${message.otp}. Please use this code to reset your password. If you didn't request this, you can ignore this email.`,
    };

    const res = await mailTransporter.sendMail(mailDetails);
    return res;
  } catch (error) {
    console.log(error, "email not sent");
  }
};
export { sendMail };
